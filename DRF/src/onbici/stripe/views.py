from datetime import datetime
from rest_framework import status
from django.shortcuts import get_object_or_404, render, redirect
from django.views.generic.base import View
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
import pytz 
from onbici.subscription.serializers import SubscriptionSerializer
from onbici.subscription.models import Subscription
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeWebhook(APIView):

    def post(self, request):

        try:
            event = stripe.Webhook.construct_event(
                payload = request.body, 
                sig_header = request.META["HTTP_STRIPE_SIGNATURE"], 
                secret = settings.STRIPE_WEBHOOK_SECRET)
            data = event['data']
        except Exception as e:
            print(e)
            
        """ event_type = event['type']
        data_object = data['object'] """

        if event['type'] == 'customer.subscription.created':

            tz = pytz.timezone("CET")

            subscription = Subscription.objects.create(
                stripe_subscription_id = data.object.id,
                stripe_price_id = data.object.plan.id,
                customer = data.object.customer,
                period_start =  datetime.fromtimestamp(data.object.current_period_start, tz),
                period_end = datetime.fromtimestamp(data.object.current_period_end, tz),
                cancel_at_period_end = data.object.cancel_at_period_end,
                cancel_at = datetime.fromtimestamp(data.object.cancel_at, tz) if data.object.cancel_at != None else data.object.cancel_at,
                ended_at = datetime.fromtimestamp(data.object.ended_at, tz) if data.object.ended_at != None else data.object.ended_at,
                status = data.object.status
            )

        if event['type'] == 'customer.subscription.deleted':

            tz = pytz.timezone("CET")

            subscription = Subscription.objects.get(stripe_subscription_id = data.object.id, status="active")
            data = {
                'stripe_subscription_id': data.object.id,
                'stripe_price_id': data.object.plan.id,
                'customer': data.object.customer,
                'period_start':  datetime.fromtimestamp(data.object.current_period_start, tz),
                'period_end': datetime.fromtimestamp(data.object.current_period_end, tz),
                'cancel_at_period_end': data.object.cancel_at_period_end,
                'cancel_at': datetime.fromtimestamp(data.object.cancel_at, tz) if data.object.cancel_at != None else data.object.cancel_at,
                'ended_at': datetime.fromtimestamp(data.object.ended_at, tz) if data.object.ended_at != None else data.object.ended_at,
                'status': data.object.status
            }
            data = SubscriptionSerializer(instance=subscription, data=data)

            if data.is_valid():
                data.save()
                return Response(data.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        if event['type'] == 'customer.subscription.updated':

            tz = pytz.timezone("CET")

            subscription = Subscription.objects.get(stripe_subscription_id = data.object.id, status="active")
            data = {
                'stripe_subscription_id': data.object.id,
                'stripe_price_id': data.object.plan.id,
                'customer': data.object.customer,
                'period_start':  datetime.fromtimestamp(data.object.current_period_start, tz),
                'period_end': datetime.fromtimestamp(data.object.current_period_end, tz),
                'cancel_at_period_end': data.object.cancel_at_period_end,
                'cancel_at': datetime.fromtimestamp(data.object.cancel_at, tz) if data.object.cancel_at != None else data.object.cancel_at,
                'ended_at': datetime.fromtimestamp(data.object.ended_at, tz) if data.object.ended_at != None else data.object.ended_at,
                'status': data.object.status
            }
            data = SubscriptionSerializer(instance=subscription, data=data)

            if data.is_valid():
                data.save()
                return Response(data.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return HttpResponse()




