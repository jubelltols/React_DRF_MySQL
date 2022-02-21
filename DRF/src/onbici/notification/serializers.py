from rest_framework import serializers

from onbici.notification.models import Notification
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ['id', 'title', 'description', 'status', 'incidence_id', 'created_at', 'modified_at']
