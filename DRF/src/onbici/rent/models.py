from django.db import models

from django.contrib.auth.models import User
from onbici.slot.models import Slot
from onbici.bike.models import Bike

class Rent(models.Model):

    user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="user")
    bike =  models.ForeignKey(Bike, on_delete=models.CASCADE, null=True, related_name="bike")
    start_slot =  models.ForeignKey(Slot, on_delete=models.CASCADE, null=True, related_name="start_slot")
    end_slot =  models.ForeignKey(Slot, on_delete=models.CASCADE, null=True, related_name="end_slot")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id
