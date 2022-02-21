from rest_framework import  mixins, status, viewsets, serializers
from .serializers import RentSerializer, DashboardSerializer
from rest_framework.permissions import (AllowAny, IsAuthenticated,)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Rent
from django.contrib.auth.models import User
from onbici.slot.models import Slot
from onbici.rent.models import Rent

class RentViewSetAdmin(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    permission_classes = [AllowAny]

class RentViewSet(mixins.CreateModelMixin, 
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    lookup_field = 'id'
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = User.objects.get(id=request.user.id)

        serializer_instance = self.queryset.get(user = user, end_slot__isnull=True)
        print("-------rent-------")
        print(serializer_instance)
        serializer = self.serializer_class(
            serializer_instance,
        )      

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        data = {}
        context = {'user': request.user.id}
        context['start_slot'] = request.data.get('start_slot', {})

        serializer = self.serializer_class(
            data = data, context=context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print('*********** serializer.data ************')
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, id):
        serializer_context = {'request': request}
        user = User.objects.get(id=request.user.id)
        try:
            serializer_instance = self.queryset.get(user = user, id=id, end_slot__isnull=True)
        except Rent.DoesNotExist:
            raise serializers.ValidationError({'name': 'Please enter a valid name.'})

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, id):
        serializer_context = {'request': request}
        user = User.objects.get(id=request.user.id)
        
        try:
            serializer_instance = self.queryset.get(id = id, user = user, end_slot__isnull=True)
        except Rent.DoesNotExist:
            raise serializers.ValidationError({'name': 'Please enter a valid name.'})

        try:
            slot = Slot.objects.get(pk=request.data.get('end_slot',{}), bike__isnull=True)
        except Rent.DoesNotExist:
            raise serializers.ValidationError({'name': 'Please enter a valid slot.'})

        serializer_data = {"end_slot": request.data.get('end_slot',{})}

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        Slot.objects.filter(id=request.data.get('end_slot',{})).update(bike = serializer_instance.bike)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RentChartViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DashboardSerializer

    def get(self, request):

        serializer = self.serializer_class(context=request.user)
        return Response(serializer.dashboard_data())
 