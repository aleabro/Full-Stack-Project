from .models import CustomUser as User
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, OrganizationSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

# This view is for creating a regular user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Custom Token View to include user_type in the token
class CustomTokenObtainPairView(TokenObtainPairView):
   # serializer_class = CustomTokenObtainPairSerializer
   def validate(self, attrs):
       data = super().validate(attrs)
       data['user_type'] = self.user.user_type  # Aggiunge il tipo di utente alla risposta
       return data


class UserTypeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'user_type': user.user_type,  # Assicurati che il campo esista nel tuo modello CustomUser
            'username': user.username,
        })
