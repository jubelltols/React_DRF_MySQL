from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter
from .views import StationViewSet, ChartStations

router = DefaultRouter(trailing_slash=False)
router.register(r'station', StationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stations/char', ChartStations.as_view()),
]

