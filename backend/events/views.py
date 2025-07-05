from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event, Favorite
from .serializers import EventSerializer, FavoriteSerializer
from accounts.permissions import IsOrganizationUser, IsRegularUser
from rest_framework import generics

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        elif self.action == 'favorite':
            return [IsAuthenticated(), IsRegularUser()]
        return [IsAuthenticated(), IsOrganizationUser()]

    def get_queryset(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return Event.objects.filter(organizer=self.request.user)
        elif self.action == 'my_events':
            return Event.objects.filter(organizer=self.request.user)
        return Event.objects.all()

    def perform_create(self, serializer):  
        serializer.save(organizer=self.request.user)

    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        event = self.get_object()
        user = request.user

        fav, created = Favorite.objects.get_or_create(user=user, event=event)
        if not created:
            fav.delete()
            return Response({'status': 'unfavorited'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'status': 'favorited'}, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsRegularUser])
    def my_favorites(self, request):
        favorites = Favorite.objects.filter(user=request.user).select_related('event')
        events = [f.event for f in favorites]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsOrganizationUser])
    def my_events(self, request):
        events = self.get_queryset()
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)