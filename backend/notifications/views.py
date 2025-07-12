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

        # Controlla se esiste un utente registrato con questa email
        user = CustomUser.objects.filter(email=email).first()
        
        if user:
            # Se l'utente esiste ed è già iscritto alla newsletter
            if user.newsletter_subscription:
                return Response({
                    "success": False, 
                    "message": "Questa email è già iscritta alla newsletter"
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Se l'utente esiste ma non è iscritto, lo iscrive
                user.newsletter_subscription = True
                user.save()
                
                send_mail(
                    'Iscrizione newsletter',
                    'Grazie per esserti iscritto alla nostra newsletter!',
                    'weloveevents00@gmail.com',
                    [email],
                    fail_silently=True,
                )
                
                return Response({
                    "success": True,
                    "message": "Iscrizione avvenuta con successo!"
                }, status=status.HTTP_201_CREATED)
        else:
            # Se non esiste un utente registrato, controlla se è già negli iscritti anonimi
            if NewsletterSubscriber.objects.filter(email=email).exists():
                return Response({
                    "success": False, 
                    "message": "Questa email è già iscritta alla newsletter"
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Crea una nuova iscrizione anonima
                NewsletterSubscriber.objects.create(email=email)
                
                send_mail(
                    'Iscrizione newsletter',
                    'Grazie per esserti iscritto alla nostra newsletter!',
                    'weloveevents00@gmail.com',
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

        # Controlla se esiste un utente registrato con questa email
        user = CustomUser.objects.filter(email=email).first()
        user_found = False
        anon_found = False
        
        if user and user.newsletter_subscription:
            # Disiscrivi l'utente registrato
            user.newsletter_subscription = False
            user.save()
            user_found = True

        # Controlla e rimuovi anche dagli iscritti anonimi se presente
        anon_subscriber = NewsletterSubscriber.objects.filter(email=email).first()
        if anon_subscriber:
            anon_subscriber.delete()
            anon_found = True

        if user_found or anon_found:
            # Invia mail di conferma disiscrizione
            send_mail(
                'Disiscrizione newsletter',
                'La tua disiscrizione dalla newsletter è stata confermata. Ci dispiace vederti andare!',
                'weloveevents00@gmail.com',
                [email],
                fail_silently=True,
            )
            
            return Response({"success": True, "message": "Disiscrizione avvenuta con successo!"}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "Questa email non è iscritta alla newsletter"}, status=status.HTTP_400_BAD_REQUEST)
        