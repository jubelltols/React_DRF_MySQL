from rest_framework import mixins, status, viewsets
from rest_framework.permissions import (IsAuthenticated)
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import serializers
from rest_framework.views import APIView

from .serializers import StationSerializer, StationForRentSerializer, ChartStationsSerializer
from onbici.core.permissions import IsStaff
from .models import Station

class StationViewSet(mixins.CreateModelMixin, 
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):

    lookup_field = 'id'
    queryset = Station.objects.all()
    serializer_class = StationSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'PUT':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAuthenticated, IsStaff]
            
        return super(StationViewSet,self).get_permissions()

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = StationForRentSerializer(serializer_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        context = {'request': request}

        data = request.data

        serializer = self.serializer_class(
            data=data, context=context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, id):
        serializer_context = {'request': request}
        try:
            serializer_instance = self.queryset.get(id = id)
        except Station.DoesNotExist:
            raise serializers.ValidationError({'station': 'Station not found'})
            
        serializer_data = request.data

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, id):
        try:
            station = Station.objects.get(id=id)
        except Station.DoesNotExist:
            raise NotFound('A station with this id does not exist.')

        station.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class ChartStations(APIView):
    permission_classes = [IsAuthenticated, IsStaff]
    serializer_class = ChartStationsSerializer

    def get(self, request, format=None):
        serializer_data = Station.objects.all()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response({
            'char': serializer.data
        }, status=status.HTTP_200_OK)


