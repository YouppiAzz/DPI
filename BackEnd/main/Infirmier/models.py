from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin



# **********************************************************

class InfirmierManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        user = self.model(email=email.lower(), **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user



class Infirmier(AbstractBaseUser, PermissionsMixin):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    specialite = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    objects = InfirmierManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'specialite']

    def __str__(self):
        return f"Infirmier {self.nom} {self.prenom} - {self.specialite}"

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

