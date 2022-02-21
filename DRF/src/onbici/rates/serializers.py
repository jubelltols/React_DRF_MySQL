from .models import Rates
from rest_framework import serializers


class RatesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rates
        fields = ['name', 'slug', 'description', 'price', 'status', 'created_at', 'modified_at']