from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter

from .views import BikeViewSet, BikeStatusViewSet

app_name = 'bike'

router = DefaultRouter(trailing_slash=False)
router.register(r'bikes', BikeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('bike/status/<int:id>', BikeStatusViewSet.as_view()),
]

