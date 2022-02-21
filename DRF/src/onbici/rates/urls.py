from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter

from .views import RatesViewSet

app_name = 'rates'

router = DefaultRouter(trailing_slash=False)
router.register(r'rates', RatesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

