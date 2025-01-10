from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from Medecin.models import CustomUser,Bilan
from Radiologue.models import Radiologue

class Laboratorian(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Laboratorian_profile')
    Domaine = models.CharField(max_length=50)

    def __str__(self):
        return f"Laboratorian {self.user.nom} {self.user.prenom} - {self.Domaine}"


# ********************************************************

class BilanLabRad(models.Model):
    bilan = models.OneToOneField(Bilan, on_delete=models.CASCADE, related_name='bilan_lab_rad')
    radiologue = models.ForeignKey(Radiologue, on_delete=models.CASCADE, blank=True, null=True)
    laboratorian = models.ForeignKey(Laboratorian, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"Bilan de la laboratorian {self.laboratorian} et radiologue {self.radiologue}"

