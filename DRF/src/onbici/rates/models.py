from django.db import models

class Rates(models.Model):

    name = models.CharField(max_length=500)
    slug = models.SlugField(max_length=100,unique=True)
    description = models.TextField(blank=True,default="")
    price = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True,db_index=True)

    def __unicode__(self):
        return self.name
