import json
import pytz
import stripe
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics
from rest_framework.permissions import (AllowAny, IsAuthenticated,)

from django.contrib.auth.models import User
from .models import Subscription
from .serializers import SubscriptionSerializer

from datetime import datetime
stripe.api_key = settings.STRIPE_SECRET_KEY

class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserSubscriptionView(generics.RetrieveAPIView):
    queryset = Subscription.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscriptionSerializer
    
    def retrieve(self, request, pk=None):
        stripe_customer_id = request.user.profile.stripe_customer_id

        try:
            data = self.queryset.get(status="active", customer=stripe_customer_id)
        except User.DoesNotExist:
            return Response('A subscription with this id does not exist.', status=404)
        
        serializer = self.serializer_class(data, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubscriptionCreateView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data

        try:
            stripe_customer_id = request.user.profile.stripe_customer_id
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscription = stripe.Subscription.create(
                customer=stripe_customer_id,
                items=[{
                    'price': data['priceId'],
                }],
                payment_behavior='default_incomplete',
                expand=['latest_invoice.payment_intent'],
            )
            return Response({"stripe_subscription_id": subscription.id, "clientSecret": subscription.latest_invoice.payment_intent.client_secret}, 200)

        except Exception as e:
            return Response(str(e), 200)

class SubscriptionCancelView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        tz = pytz.timezone("CET")
        cancel_at_period_end = request.data['cancel_at_period_end']

        try:
            stripe_customer_id = request.user.profile.stripe_customer_id
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscription = Subscription.objects.get(customer=stripe_customer_id, status="active")
        except Exception as e:
            return Response({"error": {'message': str(e)} })
        
        try:
            if cancel_at_period_end == True:
                subscriptionResponse = stripe.Subscription.modify(
                    subscription.stripe_subscription_id,
                    cancel_at_period_end=True
                )
            else:
                subscriptionResponse = stripe.Subscription.delete(
                    subscription.stripe_subscription_id
                )
            
            data = {
                'stripe_subscription_id': subscriptionResponse.id,
                'stripe_price_id': subscriptionResponse.plan.id,
                'customer': subscriptionResponse.customer,
                'period_start':  datetime.fromtimestamp(subscriptionResponse.current_period_start, tz),
                'period_end': datetime.fromtimestamp(subscriptionResponse.current_period_end, tz),
                'cancel_at_period_end': subscriptionResponse.cancel_at_period_end,
                'cancel_at': datetime.fromtimestamp(subscriptionResponse.cancel_at, tz) if subscriptionResponse.cancel_at != None else subscriptionResponse.cancel_at,
                'ended_at': datetime.fromtimestamp(subscriptionResponse.ended_at, tz) if subscriptionResponse.ended_at != None else subscriptionResponse.ended_at,
                'status': subscriptionResponse.status
            }

            return Response(data)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })

class SubscriptionReactiveView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def put(self, request):
        tz = pytz.timezone("CET")
        try:
            stripe_customer_id = request.user.profile.stripe_customer_id
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscription = Subscription.objects.get(customer=stripe_customer_id, status="active")
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscriptionResponse = stripe.Subscription.modify(
                subscription.stripe_subscription_id,
                cancel_at_period_end=False
            )

            data = {
                'stripe_subscription_id': subscriptionResponse.id,
                'stripe_price_id': subscriptionResponse.plan.id,
                'customer': subscriptionResponse.customer,
                'period_start':  datetime.fromtimestamp(subscriptionResponse.current_period_start, tz),
                'period_end': datetime.fromtimestamp(subscriptionResponse.current_period_end, tz),
                'cancel_at_period_end': subscriptionResponse.cancel_at_period_end,
                'cancel_at': datetime.fromtimestamp(subscriptionResponse.cancel_at, tz) if subscriptionResponse.cancel_at != None else subscriptionResponse.cancel_at,
                'ended_at': datetime.fromtimestamp(subscriptionResponse.ended_at, tz) if subscriptionResponse.ended_at != None else subscriptionResponse.ended_at,
                'status': subscriptionResponse.status
            }

            return Response(data)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })
    
class SubscriptionUpdateView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        tz = pytz.timezone("CET")
        data = request.data
        
        try:
            stripe_customer_id = request.user.profile.stripe_customer_id
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscriptionToUpdate = Subscription.objects.get(customer=stripe_customer_id, status="active")
        except Exception as e:
            return Response({"error": {'message': str(e)} })

        try:
            subscription = stripe.Subscription.retrieve(subscriptionToUpdate.stripe_subscription_id)

            updatedSubscription = stripe.Subscription.modify(
                subscriptionToUpdate.stripe_subscription_id,
                items=[{
                    'id': subscription['items']['data'][0].id,
                    'price': data['priceId'],
                }]
            )

            data = {
                'stripe_subscription_id': updatedSubscription.id,
                'stripe_price_id': updatedSubscription.plan.id,
                'customer': updatedSubscription.customer,
                'period_start':  datetime.fromtimestamp(updatedSubscription.current_period_start, tz),
                'period_end': datetime.fromtimestamp(updatedSubscription.current_period_end, tz),
                'cancel_at_period_end': updatedSubscription.cancel_at_period_end,
                'cancel_at': datetime.fromtimestamp(updatedSubscription.cancel_at, tz) if updatedSubscription.cancel_at != None else updatedSubscription.cancel_at,
                'ended_at': datetime.fromtimestamp(updatedSubscription.ended_at, tz) if updatedSubscription.ended_at != None else updatedSubscription.ended_at,
                'status': updatedSubscription.status
            }

            return Response(data)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })

            