from rest_framework.routers import DefaultRouter
from .views import NewsletterViewSet

router = DefaultRouter()
router.register(r'newsletter', NewsletterViewSet, basename='newsletter')

urlpatterns = router.urls