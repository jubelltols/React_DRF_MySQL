from rest_framework import mixins, status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import ( IsAuthenticated )

from onbici.core.permissions import IsStaff
from .models import Notification
from onbici.notification.serializers import NotificationSerializer

class NotificationViewSet(mixins.CreateModelMixin, 
                            mixins.ListModelMixin,
                            mixins.UpdateModelMixin,
                            viewsets.GenericViewSet):
    lookup_field = 'id'
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset

        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

    def get_permissions(self):
        if self.request.method == 'PUT':
            self.permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            self.permission_classes = [IsAuthenticated, IsStaff]
            
        return super(NotificationViewSet,self).get_permissions()

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, id):
        Notification.objects.filter(status='active').update(status='disable')
        return Response("ok", status=status.HTTP_200_OK)
