from .models import CustomUser as User
from .models import OrganizationProfile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# Serializers for regular Users only
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    class Meta:
        model = User
        # add here if you want to include more fields to pass to the API
        fields = ('id', 'username', 'email','password', 'first_name', 'last_name', 'user_type','newsletter_subscription')
        read_only_fields = ('id', 'user_type')
        

    #Method to validate the user once created
    def create(self, validated_data):
        validated_data['user_type'] = 'regular'  # Default user type
        user = User.objects.create_user(**validated_data)
        return user


class OrganizationProfileSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False)
    class Meta:
        model = OrganizationProfile
        fields = ['organization_name', 'logo', 'partita_iva', 'address']

# Separate serializer for OrganizationProfile
class OrganizationSerializer(serializers.ModelSerializer):

    organization_profile = OrganizationProfileSerializer(required=False)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    newsletter_subscription = serializers.BooleanField(required=False, default=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password','organization_profile', 'user_type', 'newsletter_subscription')

    def create(self, validated_data):
        
        profile_data = validated_data.pop('organization_profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='organization',
            newsletter_subscription=False  # Default value for organization users
        )
        OrganizationProfile.objects.create(user=user, **profile_data)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'user_type', 'newsletter_subscription')
        read_only_fields = ('id', 'user_type')

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class OrganizationUpdateSerializer(serializers.ModelSerializer):
    organization_profile = OrganizationProfileSerializer(required=False)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'user_type', 'organization_profile')
        read_only_fields = ('id', 'user_type')

    def update(self, instance, validated_data):
        org_data = validated_data.pop('organization_profile', None)
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)

        instance.save()

        if org_data:
            org_profile = getattr(instance, 'organization_profile', None)
            if org_profile:
                for attr, value in org_data.items():
                    setattr(org_profile, attr, value)
                org_profile.save()

        return instance


# Custom Token Serializer to include user_type in the token needed for the frontend and JWT authentication
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["user_type"] = user.user_type

        return token
