from rest_framework import serializers

from .models import Incidences
from onbici.notification.models import Notification
from onbici.station.serializers import StationSerializer
from onbici.authentication.serializers import UserSerializer
from onbici.station.models import Station
from django.contrib.auth.models import User

class IncidencesSerializer(serializers.ModelSerializer):
    station = StationSerializer(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Incidences
        fields = ['id', 'user', 'station', 'title', 'description', 'solution', 'status', 'created_at', 'modified_at']
    
    def create(self, validated_data):

        try:
            user = User.objects.get(id=self.context['user'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'error': 'Please enter a valid user.'})

        try:
            station = Station.objects.get(id=self.context['station'])
        except Station.DoesNotExist:
            raise serializers.ValidationError({'error': 'Please enter a valid slot.'})
        
        incidences = Incidences.objects.create(user = user, station = station, **validated_data)
        Notification.objects.create(title = "Incidence in station: "+ station.name, description=incidences.title, status="active", incidence_id=incidences.id) 
        return incidences

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()
