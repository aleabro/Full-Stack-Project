from django.urls import path
from .views import CreateUserView, CreateOrganizationView, ProfileView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('organization/register/', CreateOrganizationView.as_view(), name='register_organization'),
    path("profile/", ProfileView.as_view(), name="profile"),
]
