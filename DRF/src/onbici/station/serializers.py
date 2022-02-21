from .models import Station
from rest_framework import serializers
from onbici.slot.serializers import SlotSerializer

class StationForRentSerializer(serializers.HyperlinkedModelSerializer):
    slots = SlotSerializer(many=True)
    free_bikes = serializers.SerializerMethodField(
        method_name='get_free_bikes'
    )
    free_slots = serializers.SerializerMethodField(
        method_name='get_free_slots'
    )
    class Meta:
        model = Station
        fields = ['id', 'name', 'image', 'status', 'latitude', 'longitude', 'created_at', 'modified_at', 'slots', 'free_bikes', 'free_slots']

    def get_free_bikes(self, instance):
        return instance.slots.filter(bike__isnull=False).count()

    def get_free_slots(self, instance):
        return instance.slots.filter(bike__isnull=True).count()

class StationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Station
        fields = ['id', 'name', 'image', 'status', 'latitude', 'longitude', 'created_at', 'modified_at']

    def create(self, validated_data):        
        station = Station.objects.create(**validated_data)
        return station

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

class ChartStationsSerializer(serializers.HyperlinkedModelSerializer):
    count_slots = serializers.SerializerMethodField(
        method_name='get_count_slots'
    )
    free_bikes = serializers.SerializerMethodField(
        method_name='get_free_bikes'
    )
    free_slots = serializers.SerializerMethodField(
        method_name='get_free_slots'
    )

    class Meta:
        model = Station
        fields = ['id', 'name', 'count_slots', 'free_bikes', 'free_slots']
    
    def get_count_slots(self, instance):
        return instance.slots.count()

    def get_free_bikes(self, instance):
        return instance.slots.filter(bike__isnull=False).count()

    def get_free_slots(self, instance):
        return instance.slots.filter(bike__isnull=True).count()

