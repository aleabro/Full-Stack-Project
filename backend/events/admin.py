from django.contrib import admin
from .models import Event, Favorite

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'is_upcoming')
    search_fields = ('title', 'location')
    list_filter = ('date',)
    ordering = ('-date',)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'event')
    list_filter = ('user', 'event')
    search_fields = ('user__username', 'event__title')
    ordering = ('-user',)