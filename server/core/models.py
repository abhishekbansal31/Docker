from django.db import models

# Create your models here.

class XYZ(models.Model):
    key1 = models.CharField(verbose_name="key1", max_length=256, default="")
    key2 = models.IntegerField(verbose_name="key2", default=0)
    key3 = models.GenericIPAddressField(verbose_name="key3", default="")

    # class Meta:

    def __str__(self) -> str:
        return "key1 = " + str(self.key1) + " keys2 = " + str(self.key2) + " key3 = " + self.key3
        # pass