from .models import CustomUser as User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, OrganizationSerializer, CustomTokenObtainPairSerializer, UserUpdateSerializer, OrganizationUpdateSerializer
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