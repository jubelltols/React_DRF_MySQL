from asyncio.windows_events import NULL
from rest_framework import serializers

from .models import Rent
from onbici.bike.serializers import BikeSerializer
from onbici.authentication.serializers import UserSerializer
from onbici.slot.models import Slot
from django.contrib.auth.models import User

class RentSerializer(serializers.ModelSerializer):
    bike = BikeSerializer(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Rent
        fields = ['id', 'user', 'bike', 'start_slot', 'end_slot', 'created_at', 'modified_at']
    
    def create(self, validated_data):

        try:
            user = User.objects.get(id=self.context['user'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'error': 'Please enter a valid user.'})

        try:
            slot = Slot.objects.get(id=self.context['start_slot'], bike__id__isnull=False)
        except Slot.DoesNotExist:
            raise serializers.ValidationError({'error': 'Please enter a valid slot.'})
        
        rent = Rent.objects.create(bike = slot.bike, user = user, start_slot = slot)
        Slot.objects.filter(id=self.context['start_slot']).update(bike = None)
        return rent

class DashboardSerializer(serializers.ModelSerializer):

    def dashboard_data(context):

        rent = Rent.objects.raw(''' SELECT id, day(created_at) as day, COUNT(created_at) as countRent
                                        FROM rent_rent  
                                        WHERE created_at > current_date - interval 7 day
                                        GROUP BY day(created_at); ''')

        start_statio = Rent.objects.raw(''' SELECT st.id, st.name as name, COUNT(*) as number FROM rent_rent as r, slot_slot as s, 
                                            station_station as st WHERE r.start_slot_id = s.id AND s.station_id = st.id 
                                            GROUP BY st.id ORDER BY number DESC LIMIT 1; ''')

        end_station = Rent.objects.raw(''' SELECT st.id, st.name as name, COUNT(*) as number FROM rent_rent as r, slot_slot as s, 
                                            station_station as st WHERE r.end_slot_id = s.id AND s.station_id = st.id 
                                            GROUP BY st.id ORDER BY number DESC LIMIT 1; ''')

        free_slot = Rent.objects.raw(''' SELECT s.id, COUNT(*) as free_slot FROM slot_slot s, station_station st
                                        WHERE s.station_id=st.id AND s.bike_id IS NULL AND s.status = "active"; ''')     

        free_bike = Rent.objects.raw(''' SELECT s.id, COUNT(*) as free_bike FROM slot_slot s, station_station st
                                        WHERE s.station_id=st.id AND s.bike_id IS NOT NULL AND s.status = "active"; ''')     

        disable_slot = Rent.objects.raw(''' SELECT s.id, COUNT(*) as disable_slot FROM slot_slot s, station_station st
                                        WHERE s.station_id=st.id AND s.status = "disable"; ''')         

        lasts_rents = Rent.objects.filter(bike__isnull=False).order_by('-id')[:10]                 

        data = []

        for r in rent:
            data.append({
                'day': r.day,
                'countRent': r.countRent,
            })

        stations = []

        for ss in start_statio:
            for es in end_station:
                stations.append({
                    'start_station': ss.name,
                    'end_station': es.name,
                })

        slots = []

        for fs in free_slot:
            for fb in free_bike:
                for ds in disable_slot:
                    slots.append({
                        'free_slot': fs.free_slot,
                        'free_bike': fb.free_bike,
                        'disable_slot': ds.disable_slot,
                    })

        last = []

        for lr in lasts_rents:
            last.append({
                'id': lr.id, 
                'user_id': lr.user_id, 
                'bike_id': lr.bike_id, 
                'start_slot_id': lr.start_slot_id, 
                'end_slot_id': lr.end_slot_id, 
                'created_at': lr.created_at, 
                'modified_at': lr.modified_at
            })

        this_response = {
            'chart': data,
            'stations': stations,
            'slots': slots,
            'lasts_rents': last
        }

        return this_response