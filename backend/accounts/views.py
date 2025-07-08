from .models import CustomUser as User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, OrganizationSerializer, CustomTokenObtainPairSerializer, UserUpdateSerializer, OrganizationUpdateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from notifications.models import NewsletterSubscriber
from django.core.mail import send_mail

# Create your views here.

# This view is for creating a regular user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        # Se la mail era tra gli anonimi, rimuovila e attiva la newsletter
        if NewsletterSubscriber.objects.filter(email=user.email).exists():
            NewsletterSubscriber.objects.filter(email=user.email).delete()
            user.newsletter = True
            user.save()
            # Invia una mail di benvenuto
            send_mail(
            'Iscrizione sito WeLoveEvents',
            'Grazie per esserti iscritto al sito WeLoveEvents!',
            'info@weloveevents.it',
            [user.email],
            fail_silently=True,
        )

    def get_object(self):
        return self.request.user

# This view is for creating an organization user  
class CreateOrganizationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user

# This view is for retrieving, updating, or deleting the profile of the authenticated user
# TODO: implement in the future for user page
class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user

class OrganizationProfileView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrganizationUpdateSerializer

    def get_object(self):
        return self.request.user



# Custom Token View to include user_type in the token
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer