from django.conf.urls import include, url
from django.urls.conf import path
from . import views

app_name = "users"
urlpatterns = [
    url("^$", views.UsersList.as_view(), name='user-list'),
    path("<int:user_id>/", views.UserDetail.as_view(), name='user-details'),
    path("demo/", views.Demo.as_view()),
]