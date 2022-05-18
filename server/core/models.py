from django.db import models

# Create your models here.

class XYZ(models.Model):
    key1: models.CharField(verbose_name="key1")
    key2: models.IntegerField(verbose_name="key2")
    key3: models.IPAddressField(verbose_name="key3")

    # class Meta:

    def __str__(self) -> str:
        pass