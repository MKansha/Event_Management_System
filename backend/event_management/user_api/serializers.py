
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'name']  

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['name'], 
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
