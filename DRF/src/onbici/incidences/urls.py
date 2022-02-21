from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter

from .views import IncidencesViewSet

app_name = 'incidences'

router = DefaultRouter(trailing_slash=False)
router.register(r'incidences', IncidencesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

