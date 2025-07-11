from .models import CustomUser as User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, OrganizationSerializer, CustomTokenObtainPairSerializer, UserUpdateSerializer, OrganizationUpdateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from notifications.models import NewsletterSubscriber

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"success": "Password changed successfully"}, status=status.HTTP_200_OK)

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
            user.newsletter_subscription= True
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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

# This view is for retrieving, updating, or deleting the profile of the authenticated user
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

class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user_type = self.request.query_params.get('user_type')
        if user_type:
            return User.objects.filter(user_type=user_type)
        return User.objects.all()
    
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] 