from django.urls import include, path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static 
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter(trailing_slash=False)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('onbici.authentication.urls')),
    path('api/', include('onbici.bike.urls')),
    path('api/', include('onbici.incidences.urls')),
    path('api/', include('onbici.notification.urls')),
    path('api/', include('onbici.profile.urls')),
    path('api/', include('onbici.rates.urls')),
    path('api/', include('onbici.rent.urls')),
    path('api/', include('onbici.slot.urls')),
    path('api/', include('onbici.station.urls')),
    path('api/', include('onbici.subscription.urls')),
    path('stripe/', include('onbici.stripe.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)