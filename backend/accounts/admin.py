from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, OrganizationProfile

''' 
Admin configuration for Users and Organization Profiles 

'''

class OrganizationProfileInline(admin.StackedInline):
    model = OrganizationProfile
    verbose_name_plural = 'Profilo Organizzazione'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):

    inlines = (OrganizationProfileInline,)
    
    list_display = ('username', 'email', 'first_name', 'user_type', 'is_staff')
    list_filter = ('user_type', 'is_staff', 'is_superuser', 'groups')

    fieldsets = UserAdmin.fieldsets + (
        ('Informazioni Aggiuntive', {'fields': ('user_type',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informazioni Aggiuntive', {'fields': ('user_type',)}),
    )

    def get_inline_instances(self, request, obj=None):
        if not obj or not obj.is_organization:
            return []
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.register(CustomUser, CustomUserAdmin)

@admin.register(OrganizationProfile)
class OrganizationProfileAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'get_username', 'get_user_email')
    search_fields = ('organization_name', 'user__username', 'user__email')

    @admin.display(description='Username Utente', ordering='user__username')
    def get_username(self, obj):
        return obj.user.username

    @admin.display(description='Email Utente', ordering='user__email')
    def get_user_email(self, obj):
        return obj.user.email