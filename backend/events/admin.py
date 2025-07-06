from django.contrib import admin
from .models import Event, Favorite
from django.contrib.auth import get_user_model

'''
Admin configuration for the Event and Favorite models.
Includes inline editing for Favorites within the Event admin interface.
'''

User = get_user_model()
class FavoriteInline(admin.TabularInline):
    model = Favorite
    extra = 1

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'is_upcoming')
    search_fields = ('title', 'location')
    list_filter = ('date',)
    ordering = ('-date',)

    inlines = [FavoriteInline]

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'event')
    list_filter = ('user', 'event')
    search_fields = ('user__username', 'event__title')
    ordering = ('-user',)

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type')
    search_fields = ('username', 'email')
    inlines = [FavoriteInline]

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
