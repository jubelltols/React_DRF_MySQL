from django.urls import include, path, re_path
from django.urls import reverse
from rest_framework.routers import DefaultRouter

from .views import RentViewSet, RentChartViewSet

app_name = 'rent'

router = DefaultRouter(trailing_slash=False)
router.register(r'rent', RentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('char/', RentChartViewSet.as_view(), name='chart_rent'),
]

