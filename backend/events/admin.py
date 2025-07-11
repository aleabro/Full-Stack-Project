from django.contrib import admin
from .models import Event, Favorite
from django.contrib.auth import get_user_model
from accounts.models import CustomUser
from notifications.models import NewsletterSubscriber
from django.core.mail import EmailMessage

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

    def save_model(self, request, obj, form, change):
        is_new = obj.pk is None
        super().save_model(request, obj, form, change)
        if is_new:
            subject = "Nuovo evento pubblicato!"
            
            body = (
                f"È stato pubblicato un nuovo evento: {obj.title}\n\n"
                f"Descrizione: {obj.description}\n"
                f"Data: {obj.date.strftime('%d/%m/%Y')}\n"
                f"Ora: {obj.date.strftime('%H:%M')}\n"
                f"Luogo: {obj.location}\n"
                #f"Prezzo: {obj.price} €"
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

                if obj.image:
                    email.attach_file(obj.image.path)

                email.send(fail_silently=True)


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
