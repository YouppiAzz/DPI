from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from Medecin.models import CustomUser

class Radiologue(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='Radiologue_profile')
    Domaine = models.CharField(max_length=50)

    def __str__(self):
        return f"Radiologue {self.user.nom} {self.user.prenom} - {self.specialite}"


# ********************************************************

