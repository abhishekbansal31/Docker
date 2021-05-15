from django.db import models
from django.db.models.fields import CharField

# Create your models here.

class user(models.Model):
          name = models.CharField(max_length=50)
          phone = models.IntegerField()
          address = models.CharField(max_length=100)