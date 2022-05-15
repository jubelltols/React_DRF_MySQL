import json
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics
from rest_framework.permissions import (AllowAny, IsAuthenticated,)

from django.contrib.auth.models import User
from .models import Subscription
from .serializers import SubscriptionSerializer

import stripe
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
            data = self.queryset.get(customer=stripe_customer_id, status="active")
        except User.DoesNotExist:
            return Response('A subscription with this id does not exist.', status=404)
        
        serializer = self.serializer_class(data, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubscriptionCreateView(APIView):

    def post(self, request, *args, **kwargs):
        stripe_customer_id = request.user.profile.stripe_customer_id
        data = request.data
        
        try:
            stripe.PaymentMethod.attach(
                data['paymentMethodId'],
                customer=stripe_customer_id
            )

            stripe.Customer.modify(
                stripe_customer_id,
                invoice_settings={
                    'default_payment_method': data['paymentMethodId'],
                },
            )

            subscription = stripe.Subscription.create(
                customer=stripe_customer_id,
                cancel_at_period_end=data['cancel_at_period_end'],
                items=[{'price': data["priceId"]}],
                # expand=['latest_invoice.payment_intent'],
            )

            return Response(subscription)
        except stripe.error.CardError as e:
            return Response({'message': str(e.user_message)}, 400)
        except Exception as e:
            return Response({'message': str(e)}, 400)

class SubscriptionDeleteView(APIView):

    def put(self, request):
        cancel_at_period_end = request.data['cancel_at_period_end']
        stripe_customer_id = request.user.profile.stripe_customer_id
        subscription = Subscription.objects.get(customer=stripe_customer_id, status="active")

        try:
            if cancel_at_period_end == True:
                stripe.Subscription.modify(
                    json.dumps(subscription.stripe_subscription_id),
                    cancel_at_period_end=True
                )
            else:
                subscription = stripe.Subscription.delete(
                    subscription.stripe_subscription_id
                )
            return Response(subscription)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })

class SubscriptionReactiveView(APIView):

    def put(self, request):
        stripe_customer_id = request.user.profile.stripe_customer_id
        subscription = Subscription.objects.get(customer=stripe_customer_id)

        try:
            subscription = stripe.Subscription.modify(
                subscription.stripe_subscription_id,
                cancel_at_period_end=False
            )

            return Response(subscription)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })
    
class SubscriptionUpdateView(APIView):

    def put(self, request):
        data = request.data
        stripe_customer_id = request.user.profile.stripe_customer_id
        subscriptionToUpdate = Subscription.objects.get(customer=stripe_customer_id)

        try:
            subscription = stripe.Subscription.retrieve(subscriptionToUpdate.stripe_subscription_id)

            updatedSubscription = stripe.Subscription.modify(
                subscriptionToUpdate.stripe_subscription_id,
                cancel_at_period_end=False,
                items=[{
                    'id': subscription['items']['data'][0].id,
                    'price': data['paymentMethodId'],
                }]
            )

            return Response(updatedSubscription)
        except Exception as e:
            return Response({
                "error": {'message': str(e)}
            })
    