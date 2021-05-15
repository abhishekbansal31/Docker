"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.urls.conf import path
from django.contrib import admin
from django.conf.urls.static import static

from . import views
from . import settings

#APPs
urlpatterns = [
    url(r'^$', views.demo),
    url(r'^admin/', admin.site.urls),
#    url(r"^users/", include("users.urls")),
]

#DEF
urlpatterns = urlpatterns + [
#    url("^$", views.redirectLogin),
    path("login/", views.login),
    path("logout/", views.logout),
    path("register/", views.register)
]

#API
urlpatterns = urlpatterns + [
    path("api/users/", include("users.urls"))
]

# ADDING URL AND ROOT FOR MEDIA TO URLS USING STATIC
utlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)