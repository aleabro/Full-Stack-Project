from .models import CustomUser as User
from .models import OrganizationProfile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializers for regular Users only
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password', 'first_name', 'last_name', 'user_type')
        

    #Method to validate the user once created
    def create(self, validated_data):
        validated_data['user_type'] = 'regular'  # Default user type
        user = User.objects.create_user(**validated_data)
        return user

class OrganizationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationProfile
        fields = ['organization_name', 'logo', 'partita_iva', 'address']

class OrganizationSerializer(serializers.ModelSerializer):

    organization_profile = OrganizationProfileSerializer(required=False)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password','organization_profile', 'user_type')

    def create(self, validated_data):
        
        profile_data = validated_data.pop('organization_profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='organization'
        )
        OrganizationProfile.objects.create(user=user, **profile_data)
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_type'] = user.user_type
        return token
