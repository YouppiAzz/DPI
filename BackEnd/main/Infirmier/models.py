from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from Medecin.models import CustomUser

class Infirmier(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='infirmier_profile')
    Domaine = models.CharField(max_length=50)

    def __str__(self):
        return f"Infirmier {self.user.nom} {self.user.prenom} - {self.Domaine}"


# ********************************************************

# Soin attribué à un patient
class SoinPatient(models.Model):
    infirmier = models.ForeignKey(Infirmier, on_delete=models.CASCADE, related_name='soins')
    patient = models.ForeignKey('Patient.Patient', on_delete=models.CASCADE)  # Reliez à votre modèle Patient
    observation = models.TextField()
    administration_medicaments = models.TextField(blank=True, null=True)
    details_soins = models.TextField()

    def __str__(self):
        return f"Soin du {self.patient} par {self.infirmier.nom} {self.infirmier.prenom}"

