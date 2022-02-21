from django.db import models

from onbici.bike.models import Bike
from onbici.station.models import Station

class Slot(models.Model):

    station =  models.ForeignKey(Station, on_delete=models.CASCADE, null=True, related_name="slots")
    bike =  models.OneToOneField(Bike, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id
