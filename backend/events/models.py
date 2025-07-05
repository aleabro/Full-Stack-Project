from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib import admin

from accounts.models import CustomUser 

class Event(models.Model):
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='events',
        limit_choices_to={'user_type': CustomUser.UserType.ORGANIZATION}
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    date = models.DateTimeField("Event Date")
    location = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    @admin.display(boolean=True, ordering='date', description='Is Upcoming')
    def is_upcoming(self):
        return self.date >= timezone.now()
    
    def is_past(self):
        return self.date < timezone.now()
    
    
   
    
class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='favorites',
        limit_choices_to={'user_type': CustomUser.UserType.REGULAR}
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='favorites')

    class Meta:
        # Univocity constraint to prevent duplicate favorites
        unique_together = ('user', 'event')
    
    def __str__(self):
        return f"{self.user.username} - {self.event.title}"
    
