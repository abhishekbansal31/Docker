from django.urls.conf import include, path
from . import views

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path('restricted2/', views.restricted2),
    path('restricted/', views.restricted.as_view())
]
