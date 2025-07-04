from django.db import models
from django.utils import timezone
from django.contrib import admin

class Event(models.Model):
    # Implement later a custom user model
    #organizer = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='events', limit_choices_to={'is_organizer': True})
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='event_images/')
    date = models.DateTimeField("Event Date")
    location = models.CharField(max_length=300)

    def was_published_recently(self):
        return self.date >= timezone.now() - timezone.timedelta(days=1)
    
    def __str__(self):
        return self.title
    
    @admin.display(
        boolean=True,
        ordering='date',
        description='Upcoming?',
    )
    def is_upcoming(self):
        return self.date >= timezone.now()
    
# class Favorite(models.Model):
#     # Implement later a custom user model
#     #user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='favorites')
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='favorites')

#     class Meta:
#         unique_together = ('event', 'user')
    
#     def __str__(self):
#         return f"{self.user.username} - {self.event.title}"