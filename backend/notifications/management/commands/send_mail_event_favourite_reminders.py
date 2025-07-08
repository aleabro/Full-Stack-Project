from django.core.management.base import BaseCommand
from django.utils import timezone
from django.core.mail import send_mail
from events.models import Event, Favorite
from accounts.models import CustomUser
from notifications.models import NewsletterSubscriber
from django.core.mail import EmailMessage
import datetime


class Command(BaseCommand):
    help = 'Invia una mail di promemoria agli utenti che hanno un evento tra i preferiti e agli iscritti anonimi alla newsletter per gli eventi del giorno successivo'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        tomorrow = now + timezone.timedelta(days=1)

        start_of_day = timezone.make_aware(datetime.datetime.combine(tomorrow.date(), datetime.time.min))
        end_of_day = timezone.make_aware(datetime.datetime.combine(tomorrow.date(), datetime.time.max))
        
        self.stdout.write(f"start_of_day: {start_of_day}, end_of_day: {end_of_day}")


        # Trova tutti gli eventi che si terranno domani
        events = Event.objects.filter(date__gte=start_of_day, date__lte=end_of_day)
        self.stdout.write(f"Eventi trovati: {events.count()}")


        for event in events:
            # Utenti che hanno l'evento tra i preferiti
            favorites = Favorite.objects.filter(event=event)
            user_emails = [fav.user.email for fav in favorites if fav.user.email]

            # Iscritti anonimi alla newsletter
            anon_emails = list(NewsletterSubscriber.objects.values_list('email', flat=True))

            # Unisci le email senza duplicati
            all_emails = list(set(user_emails + anon_emails))
            from_email="info@weloveevents.it"
            all_emails = [email for email in all_emails if email and "@" in email]
            to_emails = [from_email] + all_emails

            if all_emails:
                self.stdout.write(f"Invio mail per evento '{event.title}' a: {all_emails}")
                
                subject=f"Promemoria: domani c'è l'evento '{event.title}'!"
                body=(
                       f"Ciao!\n\n"
                        f"Ti ricordiamo che domani si terrà l'evento '{event.title}'.\n"
                        f"Data e ora: {event.date.strftime('%d/%m/%Y %H:%M')}\n"
                        f"Luogo: {event.location}\n"
                        f"Descrizione: {event.description}\n\n"
                        # f"Prezzo: {event.price} €"
                        f"Non mancare!"
            )
                email = EmailMessage(
                subject=subject,
                body=body,
                from_email=from_email,
                to=to_emails,
                bcc=all_emails
                )   
                if event.image:
                    email.attach_file(event.image.path)
                email.send(fail_silently=True)    


        self.stdout.write(self.style.SUCCESS('Promemoria inviati!'))