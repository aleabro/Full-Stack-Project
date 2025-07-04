from django.shortcuts import render
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing event instances.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # def get_queryset(self):
    #     """
    #     Optionally restricts the returned events to a given date,
    #     by filtering against a 'date' query parameter in the URL.
    #     """
    #     queryset = super().get_queryset()
    #     date = self.request.query_params.get('date', None)
    #     if date is not None:
    #         queryset = queryset.filter(date__date=date)
    #     return queryset
