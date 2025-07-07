from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib import admin
from accounts.models import CustomUser 

PROVINCE_CHOICES = [
  ('Agrigento', 'Agrigento (AG)'),
  ('Alessandria', 'Alessandria (AL)'),
  ('Ancona', 'Ancona (AN)'),
  ('Aosta', 'Aosta (AO)'),
  ('Arezzo', 'Arezzo (AR)'),
  ('Ascoli Piceno', 'Ascoli Piceno (AP)'),
  ('Asti', 'Asti (AT)'),
  ('Avellino', 'Avellino (AV)'),
  ('Bari', 'Bari (BA)'),
  ('Barletta-Andria-Trani', 'Barletta-Andria-Trani (BT)'),
  ('Belluno', 'Belluno (BL)'),
  ('Benevento', 'Benevento (BN)'),
  ('Bergamo', 'Bergamo (BG)'),
  ('Biella', 'Biella (BI)'),
  ('Bologna', 'Bologna (BO)'),
  ('Brindisi', 'Brindisi (BR)'),
  ('Cagliari', 'Cagliari (CA)'),
  ('Caltanissetta', 'Caltanissetta (CL)'),
  ('Campobasso', 'Campobasso (CB)'),
  ('Caserta', 'Caserta (CE)'),
  ('Catania', 'Catania (CT)'),
  ('Catanzaro', 'Catanzaro (CZ)'),
  ('Chieti', 'Chieti (CH)'),
  ('Como', 'Como (CO)'),
  ('Cosenza', 'Cosenza (CS)'),
  ('Cremona', 'Cremona (CR)'),
  ('Crotone', 'Crotone (KR)'),
  ('Cuneo', 'Cuneo (CN)'),
  ('Enna', 'Enna (EN)'),
  ('Ferrara', 'Ferrara (FE)'),
  ('Firenze', 'Firenze (FI)'),
  ('Foggia', 'Foggia (FG)'),
  ('Forlì-Cesena', 'Forlì-Cesena (FC)'),
  ('Frosinone', 'Frosinone (FR)'),
  ('Genova', 'Genova (GE)'),
  ('Gorizia', 'Gorizia (GO)'),
  ('Grosseto', 'Grosseto (GR)'),
  ('Imperia', 'Imperia (IM)'),
  ('Isernia', 'Isernia (IS)'),
  ('La Spezia', 'La Spezia (SP)'),
  ("L'Aquila", "L'Aquila (AQ)"),
  ('Latina', 'Latina (LT)'),
  ('Lecce', 'Lecce (LE)'),
  ('Lecco', 'Lecco (LC)'),
  ('Livorno', 'Livorno (LI)'),
  ('Lodi', 'Lodi (LO)'),
  ('Lucca', 'Lucca (LU)'),
  ('Macerata', 'Macerata (MC)'),
  ('Mantova', 'Mantova (MN)'),
  ('Massa-Carrara', 'Massa-Carrara (MS)'),
  ('Matera', 'Matera (MT)'),
  ('Messina', 'Messina (ME)'),
  ('Milano', 'Milano (MI)'),
  ('Modena', 'Modena (MO)'),
  ('Monza e della Brianza', 'Monza e della Brianza (MB)'),
  ('Napoli', 'Napoli (NA)'),
  ('Novara', 'Novara (NO)'),
  ('Nuoro', 'Nuoro (NU)'),
  ('Oristano', 'Oristano (OR)'),
  ('Padova', 'Padova (PD)'),
  ('Palermo', 'Palermo (PA)'),
  ('Parma', 'Parma (PR)'),
  ('Pavia', 'Pavia (PV)'),
  ('Perugia', 'Perugia (PG)'),
  ('Pesaro e Urbino', 'Pesaro e Urbino (PU)'),
  ('Pescara', 'Pescara (PE)'),
  ('Piacenza', 'Piacenza (PC)'),
  ('Pisa', 'Pisa (PI)'),
  ('Pistoia', 'Pistoia (PT)'),
  ('Pordenone', 'Pordenone (PN)'),
  ('Potenza', 'Potenza (PZ)'),
  ('Prato', 'Prato (PO)'),
  ('Ragusa', 'Ragusa (RG)'),
  ('Ravenna', 'Ravenna (RA)'),
  ('Reggio Calabria', 'Reggio Calabria (RC)'),
  ('Reggio Emilia', 'Reggio Emilia (RE)'),
  ('Rieti', 'Rieti (RI)'),
  ('Rimini', 'Rimini (RN)'),
  ('Roma', 'Roma (RM)'),
  ('Rovigo', 'Rovigo (RO)'),
  ('Salerno', 'Salerno (SA)'),
  ('Sassari', 'Sassari (SS)'),
  ('Savona', 'Savona (SV)'),
  ('Siena', 'Siena (SI)'),
  ('Siracusa', 'Siracusa (SR)'),
  ('Sondrio', 'Sondrio (SO)'),
  ('Taranto', 'Taranto (TA)'),
  ('Teramo', 'Teramo (TE)'),
  ('Terni', 'Terni (TR)'),
  ('Torino', 'Torino (TO)'),
  ('Trapani', 'Trapani (TP)'),
  ('Trento', 'Trento (TN)'),
  ('Treviso', 'Treviso (TV)'),
  ('Trieste', 'Trieste (TS)'),
  ('Udine', 'Udine (UD)'),
  ('Varese', 'Varese (VA)'),
  ('Venezia', 'Venezia (VE)'),
  ('Verbano-Cusio-Ossola', 'Verbano-Cusio-Ossola (VB)'),
  ('Vercelli', 'Vercelli (VC)'),
  ('Verona', 'Verona (VR)'),
  ('Vibo Valentia', 'Vibo Valentia (VV)'),
  ('Vicenza', 'Vicenza (VI)'),
  ('Viterbo', 'Viterbo (VT)')
]


CATEGORY_CHOICES = [
    ('musica', 'Musica e Concerti'),
    ('arte', 'Arte e Cultura'),
    ('teatro', 'Teatro e Spettacoli'),
    ('cinema', 'Cinema'),
    ('sport', 'Sport e Fitness'),
    ('corsi', 'Corsi e Workshop'),
    ('conferenze', 'Conferenze e Seminari'),
    ('fiere', 'Fiere e Mercatini'),
    ('sagre', 'Sagre e Gastronomia'),
    ('bambini', 'Eventi per Bambini e Famiglie'),
    ('tecnologia', 'Tecnologia e Innovazione'),
    ('volontariato', 'Volontariato e Sociale'),
    ('moda', 'Moda e Lifestyle'),
    ('natura', 'Natura e Outdoor'),
    ('danza', 'Danza e Ballo'),
    ('religione', 'Religione e Spiritualità'),
    ('business', 'Networking e Business'),
    ('festival', 'Festival'),
    ('mostre', 'Mostre'),
    ('altro', 'Altro'),
]

'''
Event has a ForeignKey to the Organizer that created it'''
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
    provincia = models.CharField(
        max_length=100,
        choices=PROVINCE_CHOICES,
        blank=True,
        null=True
    )
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        blank=True,
        null=True
    )
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True) 


    created_at = models.DateTimeField(auto_now_add=True)
    # Add other fields as needed, such as category

    def __str__(self):
        return self.title
    
    @admin.display(boolean=True, ordering='date', description='Is Upcoming')
    def is_upcoming(self):
        return self.date >= timezone.now()
    
    def is_past(self):
        return self.date < timezone.now()
    
    # Add other methods as needed
    
    
   
# Favorite model to allow users to favorite events. Each user can favorite an event only once. and is a foreign key to the Event model.    
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
    
