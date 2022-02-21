from .models import Bike
from rest_framework import serializers

class BikeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Bike
        fields = ['id', 'status', 'created_at', 'modified_at']