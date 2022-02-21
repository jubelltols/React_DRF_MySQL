from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import SlotViewSet

app_name = 'slot'

router = DefaultRouter(trailing_slash=False)
router.register(r'slot', SlotViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

