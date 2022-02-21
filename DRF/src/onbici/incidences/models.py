from django.db import models

from onbici.station.models import Station
from django.contrib.auth.models import User

class Incidences(models.Model):

    user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="incidences_user")
    station =  models.ForeignKey(Station, on_delete=models.CASCADE, null=True, related_name="incidences_station")
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    solution = models.CharField(max_length=200, null=True)
    status = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id

