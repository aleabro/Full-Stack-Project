from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    class UserType(models.TextChoices):
        REGULAR = 'regular', 'Regular User'
        ORGANIZATION = 'organization', 'Organization'

    user_type = models.CharField(
        max_length=20,
        choices=UserType.choices,
        default=UserType.REGULAR,
        help_text="Designa il tipo di utente."
    )

    @property
    def is_organization(self):
        return self.user_type == self.UserType.ORGANIZATION

    @property
    def is_regular_user(self):
        return self.user_type == self.UserType.REGULAR

    def __str__(self):
        return self.username

class OrganizationProfile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        primary_key=True,
        related_name='organization_profile'
    )
    organization_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    partita_iva = models.CharField(max_length=20, unique=True, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.organization_name