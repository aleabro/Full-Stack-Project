from django.urls import path
from .views import CreateUserView, CreateOrganizationView

#TODO: add login and other urls for different user types
urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('organization/register/', CreateOrganizationView.as_view(), name='register_organization'),
    
]
