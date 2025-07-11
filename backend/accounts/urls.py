from django.urls import path
from .views import CreateUserView, CreateOrganizationView, ProfileView, OrganizationProfileView, UserListView, UserDetailView, ChangePasswordView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('organization/register/', CreateOrganizationView.as_view(), name='register_organization'),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("organization/profile/", OrganizationProfileView.as_view(), name ='organization_profile' ),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

]
