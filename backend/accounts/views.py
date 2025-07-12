from .models import CustomUser as User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
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
        
        # Invia sempre una mail di benvenuto
        send_mail(
            'Benvenuto su WeLoveEvents',
            'Grazie per esserti registrato al sito WeLoveEvents! Ora puoi accedere a tutte le funzionalità del nostro sito.',
            'weloveevents00@gmail.com',
            [user.email],
            fail_silently=True,
        )
        
        # Se l'utente si è iscritto alla newsletter, invia anche la mail di conferma newsletter
        if user.newsletter_subscription:
            send_mail(
                'Iscrizione newsletter',
                'Grazie per esserti iscritto alla nostra newsletter!',
                'weloveevents00@gmail.com',
                [user.email],
                fail_silently=True,
            )
        
        # Se la mail era tra gli anonimi, rimuovila e attiva la newsletter
        if NewsletterSubscriber.objects.filter(email=user.email).exists():
            NewsletterSubscriber.objects.filter(email=user.email).delete()
            if not user.newsletter_subscription:
                user.newsletter_subscription = True
                user.save()
                # Invia la mail di conferma newsletter se non era già iscritto
                send_mail(
                    'Iscrizione newsletter',
                    'Grazie per esserti iscritto alla nostra newsletter!',
                    'weloveevents00@gmail.com',
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

    def perform_create(self, serializer):
        user = serializer.save()
        
        # Invia sempre una mail di benvenuto
        send_mail(
            'Benvenuto su WeLoveEvents',
            'Grazie per aver registrato la tua organizzazione su WeLoveEvents! Ora puoi iniziare a creare e gestire i tuoi eventi.',
            'weloveevents00@gmail.com',
            [user.email],
            fail_silently=True,
        )

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

    def perform_update(self, serializer):
        # Salva lo stato precedente della newsletter
        old_newsletter_status = self.get_object().newsletter_subscription
        
        # Salva l'utente con i nuovi dati
        user = serializer.save()
        
        # Controlla se lo stato della newsletter è cambiato
        new_newsletter_status = user.newsletter_subscription
        
        if old_newsletter_status and not new_newsletter_status:
            # L'utente si è disiscritto dalla newsletter
            send_mail(
                'Disiscrizione newsletter',
                'La tua disiscrizione dalla newsletter è stata confermata. Ci dispiace vederti andare!',
                'weloveevents00@gmail.com',
                [user.email],
                fail_silently=True,
            )
        elif not old_newsletter_status and new_newsletter_status:
            # L'utente si è iscritto alla newsletter
            send_mail(
                'Iscrizione newsletter',
                'Grazie per esserti iscritto alla nostra newsletter!',
                'weloveevents00@gmail.com',
                [user.email],
                fail_silently=True,
            )

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


# View to list all organizations
class OrganizationListView(generics.ListAPIView):
    serializer_class = OrganizationSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return User.objects.filter(user_type='organization')
