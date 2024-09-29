from django.urls import path
from .views import EventListView, EventDetailView,register_for_event,UserRegisteredEventsByIdView
from .views import get_registered_events 
urlpatterns = [
    path('', EventListView.as_view(), name='event_list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event_detail'),
    path('<int:event_id>/register/', register_for_event, name='register_for_event'),
    path('registered-events/<int:user_id>/', UserRegisteredEventsByIdView.as_view(), name='user-registered-events-by-id'),
    path('get/', get_registered_events, name='get_registered_events'), 
]
