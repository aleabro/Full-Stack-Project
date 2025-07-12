from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event, Favorite
from .serializers import EventSerializer
from accounts.permissions import IsOrganizationUser, IsRegularUser
from accounts.models import CustomUser
from notifications.models import NewsletterSubscriber
from django.core.mail import EmailMessage
from .choices import PROVINCE_CHOICES, CATEGORY_CHOICES

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # Permissions based on the action on events: listing and retrieving events is open to everyone,
    # while creating, updating, and deleting events requires the user to be authenticated and an organization user.
    # Favoriting events requires the user to be authenticated and a regular user.
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action in ['favorite', 'my_favorites']:
            return [IsAuthenticated(), IsRegularUser()]
        if self.action in ['my_events', 'create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOrganizationUser()]
        return super().get_permissions()

    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def is_favorited(self, request, pk=None):
        event = self.get_object()
        user = request.user
        is_favorited = Favorite.objects.filter(user=user, event=event).exists()
        return Response({'is_favorited': is_favorited})

    # Override of the get_queryset method to filter events based on the action.
    def get_queryset(self):
        if self.action in ['update', 'partial_update', 'destroy', 'my_events']:
            return Event.objects.filter(organizer=self.request.user)
        
        # Gestione filtri per la lista pubblica degli eventi
        queryset = Event.objects.all()
        
        # Filtro per organizzazione specifica
        organization_id = self.request.query_params.get('organization', None)
        if organization_id is not None:
            queryset = queryset.filter(organizer_id=organization_id)
            
        return queryset
    # Override of the perform_create method to set the organizer of the event to the authenticated user.
    def perform_create(self, serializer):
        event=serializer.save(organizer=self.request.user)

        subject = "Nuovo evento pubblicato!"
            
        body = (
                f"È stato pubblicato un nuovo evento: {event.title}\n\n"
                f"Descrizione: {event.description}\n"
                f"Data: {event.date.strftime('%d/%m/%Y')}\n"
                f"Ora: {event.date.strftime('%H:%M')}\n"
                f"Luogo: {event.location}\n"
               # f"Prezzo: {event.price} €"
            )

        user_emails = list(CustomUser.objects.filter(newsletter_subscription=True).values_list('email', flat=True))
        anon_emails = list(NewsletterSubscriber.objects.values_list('email', flat=True))
        all_emails = list(set(user_emails + anon_emails))
        from_email="info@weloveevents.it"
        all_emails = [email for email in all_emails if email and "@" in email]
        to_emails = [from_email] 

        if all_emails:
            # Filter out any empty emails and ensure they contain '@'
            email = EmailMessage(
            subject=subject,
            body=body,
            from_email=from_email,
            to=to_emails,
            bcc=all_emails
        )

            if event.image:
                email.attach_file(event.image.path)
            email.send(fail_silently=True)

    # the @action decorator is used to create custom actions that can be accessed via HTTP methods.
    # In this case, we are creating a custom action to favorite an event only if the user is authenticated and a regular user.
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsRegularUser])
    def favorite(self, request, pk=None):
        event = self.get_object()
        user = request.user
        # Get or create a Favorite object for the user and event.
        # If it already exists, delete it (unfavorite), otherwise create it (favorite).
        fav, created = Favorite.objects.get_or_create(user=user, event=event)
        if not created:
            fav.delete()
            return Response({'status': 'unfavorited'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'status': 'favorited'}, status=status.HTTP_201_CREATED)

    # Custom action to retrieve the user's favorite events.
    # This action is accessible only to authenticated users and regular users.
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsRegularUser])
    def my_favorites(self, request):
        favorites = Favorite.objects.filter(user=request.user).select_related('event')
        events = [f.event for f in favorites]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    # Custom action to retrieve the events created by the authenticated organization user.
    # This action is accessible only to authenticated users and organization users.
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsOrganizationUser])
    def my_events(self, request):
        events = self.get_queryset()
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

class ChoicesView(APIView):
    def get(self, request):
        return Response({
            "province": PROVINCE_CHOICES,
            "categorie": CATEGORY_CHOICES,
        })