from django.urls import path, include
from .views import EventViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'events', EventViewSet, basename='events')

urlpatterns = [
    path('', include(router.urls)),
]