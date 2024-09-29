from django.contrib.auth.backends import ModelBackend
from user_api.models import CustomUser  # Adjust this import based on your project structure

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None
