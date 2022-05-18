from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    phone = models.CharField(null=True, max_length=255)
    REQUIRED_FIELDS = ['username', 'phone', 'first_name', 'last_name']

    USERNAME_FIELD = 'email'
    # class Meta: 

    def get_username(self) -> str:
        return super().email

    def __str__(self) -> str:
        return super().email