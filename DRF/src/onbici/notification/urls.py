from django.urls import include, path, re_path
from django.urls import reverse

from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

app_name = 'notification'

router = DefaultRouter(trailing_slash=False)
router.register(r'notification', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

