from django.db import models

class Subscription(models.Model):

    stripe_subscription_id = models.CharField(max_length=500, null=True)
    stripe_price_id = models.CharField(max_length=500, null=True)
    customer = models.CharField(max_length=500,null=True)
    period_start = models.DateTimeField(null=True)
    period_end =  models.DateTimeField(null=True)
    cancel_at_period_end = models.BooleanField(null=True)
    cancel_at = models.DateTimeField(null=True)
    ended_at = models.DateTimeField(null=True)
    status = models.CharField(max_length=500, null=True,)

    def __unicode__(self):
        return self.stripe_subscription_id

    def is_active(self):
        return self.status == "active"
