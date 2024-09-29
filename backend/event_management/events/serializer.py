from rest_framework import serializers
from .models import Event,Registration

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location','capacity']



class RegistrationSerializer(serializers.ModelSerializer):
    event = EventSerializer()  
    class Meta:
        model = Registration
        fields = ['user', 'event', 'registered_at']
