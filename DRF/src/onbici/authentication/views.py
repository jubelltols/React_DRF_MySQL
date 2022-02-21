from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from onbici.core.permissions import IsStaff
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, ChangePasswordSerializer, UpdateUserSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def update(self, request):
        try:
            serializer_instance = self.queryset.get(username=request.user)
        except User.DoesNotExist:
            return Response('User not found', status=404)
        
        serializer_context = {'request': request}
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

class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer

    def update(self, request):
        try:
            serializer_instance = self.queryset.get(username=request.user)
        except User.DoesNotExist:
            return Response('User not found', status=404)
        
        serializer_context = {'request': request}
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

class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def retrieve(self, request, pk=None):
        try:
            data = self.queryset.get(username=request.user)
        except User.DoesNotExist:
            return Response('A station with this id does not exist.', status=404)
        
        serializer = self.serializer_class(data, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserIsAdminView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, IsStaff)
    serializer_class = UserSerializer
    
    def retrieve(self, request, pk=None):
        try:
            data = self.queryset.get(username=request.user)
        except User.DoesNotExist:
            return Response('A station with this id does not exist.', status=404)
        
        serializer = self.serializer_class(data, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)