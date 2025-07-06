from django.urls import path, include
from .views import EventViewSet
from rest_framework import routers

# The router is used to automatically generate the URL patterns for the EventViewSet
# It will create routes for list, create, retrieve, update, and delete actions
router = routers.DefaultRouter()
router.register(r'events', EventViewSet, basename='events')

urlpatterns = [
    path('', include(router.urls)),
    
]