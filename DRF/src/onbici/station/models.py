from distutils.command.upload import upload
from email.policy import default
from django.db import models
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'stations/{filename}'.format(filename=filename)

class Station(models.Model):

    name = models.CharField(max_length=500)
    status = models.CharField(max_length=500)
    image = models.ImageField(_("Image"), upload_to=upload_to, default='stations/default.jpg')
    latitude = models.DecimalField(max_digits=30, decimal_places=20, null=False)
    longitude = models.DecimalField(max_digits=30, decimal_places=20, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __unicode__(self):
        return self.id