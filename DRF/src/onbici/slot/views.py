from rest_framework import mixins, status, viewsets
from rest_framework.permissions import (IsAuthenticated)
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import serializers

from onbici.slot.serializers import SlotSerializer
from onbici.core.permissions import IsStaff
from .models import Slot

class SlotViewSet(mixins.CreateModelMixin, 
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):

    lookup_field = 'id'
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'PUT':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAuthenticated, IsStaff]
            
        return super(SlotViewSet,self).get_permissions()

    def create(self, request):
        data = {"status": request.data.get('status',{})}
        context = {'bike': request.data.get('bike',{})}
        context['station'] = request.data.get('station',{})

        serializer = self.serializer_class(
            data=data, context=context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print('*********** serializer.data ************')
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, id):
        print(request.data.get('status',{}))
        serializer_data = {"status": request.data.get('status',{})}
        serializer_context = {'bike': request.data.get('bike',{})}
        serializer_context['station'] = request.data.get('station',{})

        try:
            serializer_instance = self.queryset.get(id = id)
        except Slot.DoesNotExist:
            raise serializers.ValidationError({'slot': 'Slot not found'})

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, id):
        try:
            slot = Slot.objects.get(id=id)
        except Slot.DoesNotExist:
            raise NotFound('A slot with this id does not exist.')
        slot.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    