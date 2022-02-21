from rest_framework import generics, mixins, status, viewsets, serializers
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response

from django.contrib.auth.models import User
from onbici.station.models import Station
from .serializers import IncidencesSerializer
from .models import Incidences
from onbici.core.permissions import IsStaff

class IncidencesViewSet(mixins.CreateModelMixin, 
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):
    lookup_field = 'id'
    queryset = Incidences.objects.all()
    serializer_class = IncidencesSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'PUT':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAuthenticated, IsStaff]
            
        return super(IncidencesViewSet,self).get_permissions()

    def create(self, request):
        data = {'title': request.data.get('title', {})}
        data['description'] = request.data.get('description', {})
        data['status'] = "New Request"
        
        context = {'user': request.user.id}
        context['station'] = request.data.get('station', {})

        serializer = self.serializer_class(
            data = data, context=context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, id):
        
        try:
            serializer_instance = self.queryset.get(id = id)
        except Station.DoesNotExist:
            raise serializers.ValidationError({'incidences': 'Incidences not found'})
            
        serializer_data = request.data
        serializer_context = {'request': request}

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
