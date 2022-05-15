from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from onbici.profile.models import Profile
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@receiver(post_save, sender=User)
def create_related_profile(sender, instance, created, *args, **kwargs):
    # Notice that we're checking for `created` here. We only want to do this
    # the first time the `User` instance is created. If the save that caused
    # this signal to be run was an update action, we know the user already
    # has a profile.

    #Crear cliente en stripe
    stripe_customer = stripe.Customer.create(
        email=instance.email,
        metadata={'user_id': instance.id}
    )

    if instance and created:
        instance.profile = Profile.objects.create(user=instance, stripe_customer_id=stripe_customer['id'])
