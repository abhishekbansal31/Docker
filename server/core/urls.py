from django.urls.conf import include, path
from . import views

urlpatterns = [
    path('home/', views.home.as_view())
]