from rest_framework import serializers

from onbici.bike.serializers import BikeSerializer
from onbici.bike.models import Bike
from onbici.station.models import Station
from .models import Slot

class SlotSerializer(serializers.ModelSerializer):
    bike = BikeSerializer(required=False)

    class Meta:
        model = Slot
        fields = ['id', 'station', 'bike', 'status', 'created_at', 'modified_at']

    def create(self, validated_data):
        if self.context['bike'] is not None:
            try:
                bike = Bike.objects.get(id=self.context['bike'])
            except Bike.DoesNotExist:
                raise serializers.ValidationError({'error': 'Please enter a valid user.'})
        else:
            bike = None

        try:
            station = Station.objects.get(id=self.context['station'])
        except Station.DoesNotExist:
            raise serializers.ValidationError({'error': 'Please enter a valid slot.'})
        
        slot = Slot.objects.create(bike = bike, station = station, **validated_data)
        return slot

    def update(self, instance, validated_data):

        if self.context['bike']:
            try:
                bike = Bike.objects.get(id=self.context['bike'])
                """ falta comprobar si la bici esta en otro slot """
            except Bike.DoesNotExist:
                raise serializers.ValidationError({'error': 'Please enter a valid user.'})
            instance.bike = bike
        elif self.context['bike'] is None:
            instance.bike = None

        if self.context['station']:
            try:
                station = Station.objects.get(id=self.context['station'])
            except Station.DoesNotExist:
                raise serializers.ValidationError({'error': 'Please enter a valid slot.'})
            instance.station = station
        if validated_data.get('status', instance.status) is not None: 
            instance.status = validated_data.get('status', instance.status)

        instance.save()
        return instance