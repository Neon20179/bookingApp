from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('guest_api/', include('guest_api.urls')),
    path('administrator_api/', include('administrator_api.urls')),
    path('', include('frontend.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
