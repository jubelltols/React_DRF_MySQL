from django.db import models

from onbici.incidences.models import Incidences

class Notification(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    incidence = models.OneToOneField(Incidences, on_delete=models.CASCADE, null=True, related_name="notification_user")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id
