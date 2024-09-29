from rest_framework import generics
from .serializer import EventSerializer,RegistrationSerializer
from .models import Event, Registration 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Registration, CustomUser
from django.shortcuts import get_object_or_404
from .models import Event
from .serializer import EventSerializer, RegistrationSerializer
from .models import Event, Registration
from django.core.mail import send_mail  
from django.conf import settings  
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from user_api.models import CustomUser 
from django.http import JsonResponse

import json
class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer



def register_for_event(request, event_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('userId')
        user_email = data.get('email')
        print(f"Received userId: {user_id}")
        print(f"Received email: {user_email}")

        
        user = get_object_or_404(CustomUser, id=user_id)

        
        event = get_object_or_404(Event, id=event_id)

        current_registration_count = Registration.objects.filter(event=event).count()
        if current_registration_count >= event.capacity:
            return JsonResponse({'error': 'Event is completely booked'}, status=400)

        try:
            registration, created = Registration.objects.get_or_create(user=user, event=event)
            if created:
             
                try:
                    send_mail(
                        subject='Registration Confirmation',
                        message=f'You have successfully registered for the event: {event.title}',
                        from_email=settings.EMAIL_HOST_USER,
                        recipient_list=[user_email],
                        fail_silently=False,
                    )
                except Exception as e:
                    return JsonResponse({'error': f'Failed to send email: {str(e)}'}, status=500)

                return JsonResponse({'success': 'User registered for event'}, status=200)
            else:
                return JsonResponse({'error': 'User is already registered for this event'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


class UserRegisteredEventsByIdView(generics.ListAPIView):
    serializer_class = RegistrationSerializer

    def get_queryset(self):
     
        user_id = self.kwargs['user_id']
      
        user = get_object_or_404(CustomUser, id=user_id)
      
        return Registration.objects.filter(user=user)



class UserRegisteredEventsByIdView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
  

    def get_queryset(self):
        
        user_id = self.kwargs['user_id']

        user = get_object_or_404(CustomUser, id=user_id)

   
        return Registration.objects.filter(user=user)



@api_view(['GET'])
def get_registered_events(request):
    """
    Retrieve all registrations.
    """
    try:
        registrations = Registration.objects.all()  
        serializer = RegistrationSerializer(registrations, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK)  
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  