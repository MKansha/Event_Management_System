
from django.urls import path
from .views import register, login, verify_otp,logout_view

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('verify-otp/', verify_otp, name='verify-otp'),
    path('logout/', logout_view, name='logout_view'),
]
