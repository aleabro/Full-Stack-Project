from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import NewsletterSubscriber
from .serializers import NewsletterSubscriberSerializer
from accounts.models import CustomUser
from django.core.mail import send_mail

class NewsletterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"success": False, "message": "Email mancante"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.filter(email=email).first()
        if user:
            user.newsletter_subscription = True
            user.save()
        else:
            NewsletterSubscriber.objects.get_or_create(email=email)

        send_mail(
            'Iscrizione newsletter',
            'Grazie per esserti iscritto alla nostra newsletter!',
            'info@weloveevents.it',
            [email],
            fail_silently=True,
        )

        return Response({
            "success": True,
            "message": "Iscrizione avvenuta con successo!"
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def unsubscribe(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"success": False, "message": "Email mancante"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.filter(email=email).first()
        if user:
            user.newsletter_subscription = False
            user.save()
            return Response({"success": True, "message": "Disiscrizione avvenuta con successo!"}, status=status.HTTP_200_OK)
        