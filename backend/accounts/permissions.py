from rest_framework.permissions import BasePermission

class IsOrganizationUser(BasePermission):
    message = "Devi essere un'organizzazione per eseguire questa azione."
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_organization)

class IsRegularUser(BasePermission):
    message = "Devi essere un utente regolare per eseguire questa azione."
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_regular_user)
