from django.db import models
from onbici.station.models import Station

class Bike(models.Model):

    status = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id
