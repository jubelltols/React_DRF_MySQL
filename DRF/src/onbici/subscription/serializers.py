from .models import Subscription
from rest_framework import serializers

class SubscriptionSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Subscription
        fields = [ 'stripe_subscription_id', 'stripe_price_id', 'customer', 'period_start', 'period_end', 'cancel_at_period_end', 
                    'cancel_at', 'ended_at', 'status']