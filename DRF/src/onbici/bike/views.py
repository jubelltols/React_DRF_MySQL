from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly)

from .models import Bike
from onbici.bike.serializers import BikeSerializer
from onbici.core.permissions import IsStaff

class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'PUT':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAuthenticated, IsStaff]        
        return super(BikeViewSet,self).get_permissions()

class BikeStatusViewSet(generics.UpdateAPIView):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated, IsStaff]
    
    def put(self, request, id):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(id=id)
        except Bike.DoesNotExist:
            return  Response('A bike with this id does not exist.', status=404)

        serializer_data = request.data.get('bike', {})
        
        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
