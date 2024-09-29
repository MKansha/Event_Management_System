import random
import logging
from django.core.mail import send_mail
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer
from django.conf import settings
from user_api.serializers import LoginSerializer 
from django.contrib.auth import get_user_model  
import datetime
logger = logging.getLogger(__name__)
import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .serializers import RegisterSerializer  
from user_api.models import CustomUser  
from django.conf import settings 

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        otp = random.randint(100000, 999999)
        user.otp = otp
        user.save(update_fields=['otp']) 

        # Debugging
        print(f"Generated OTP: {otp}")
        print(f"Saved OTP in user object: {user.otp}")

        # Send OTP via email
        try:
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            
            return Response({'error': f'Failed to send OTP: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'User registered successfully. OTP sent to your email.'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({"error": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
        print(f"Received OTP: {otp}")
        print(f"Stored OTP: {user.otp}")
        if user.otp == int(otp):
            user.otp = None  
            user.save()
            return Response({'message': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

from django.contrib.auth import logout
from django.http import JsonResponse


def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully.'}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)








@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        User = get_user_model()  
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):  
            access_token = AccessToken.for_user(user)
            response = Response({
                'message': 'Login successful!',
                'user': {
                    'username': user.username,  
                    'email': user.email,        
                    'id': user.id           
                }
            }, status=status.HTTP_200_OK)

            print(f"Access Token: {access_token}")

            # Set the token in cookies
            response.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,  
                secure=False,  
                samesite='Lax',  
                expires=datetime.datetime.now() + datetime.timedelta(days=1)
            )
            
            return response
        else:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
