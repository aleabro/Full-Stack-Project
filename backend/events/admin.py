from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'is_upcoming')
    search_fields = ('title', 'location')
    list_filter = ('date',)
    ordering = ('-date',)

admin.site.register(Event, EventAdmin)
