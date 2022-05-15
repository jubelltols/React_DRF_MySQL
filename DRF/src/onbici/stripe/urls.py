from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter
from .views import StripeWebhook

urlpatterns = [
    path('webhook/', StripeWebhook.as_view()),
]

