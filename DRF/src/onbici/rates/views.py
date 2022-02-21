from rest_framework import viewsets
from rest_framework import permissions

from .models import Rates
from onbici.rates.serializers import RatesSerializer

class RatesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Rates.objects.all()
    serializer_class = RatesSerializer
    permission_classes = [permissions.IsAuthenticated]
