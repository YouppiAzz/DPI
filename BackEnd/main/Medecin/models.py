import uuid
import hashlib
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        hash_object = hashlib.sha256(password.encode())
        hex_dig = hash_object.hexdigest()
        user.set_password(hex_dig)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = (
        ('medecin', 'Medecin'),
        ('infirmier', 'Infirmier'),
        ('patient', 'Patient'),
        ('radiologue', 'Radiologue'),
        ('laboratorian', 'Laboratorian'),
        ('admin','Admin'),
    )
    id = models.AutoField(primary_key=True)  # AutoField automatically increments integer IDs
    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # For admin users
    user_type = models.CharField(max_length=15, choices=USER_TYPES, default='admin')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom']

    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.user_type}"


class Medecin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='medecin_profile')
    specialite = models.CharField(max_length=50)

    def __str__(self):
        return f"Dr. {self.user.nom} {self.user.prenom} - {self.specialite}"


#**************************************************************/
class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    duree = models.CharField(max_length=50)  # Durée de prise en charge, par exemple "7 jours"

    def __str__(self):
        return f"{self.nom} - {self.dosage} pendant {self.duree}"

#**************************************************************/
class Ordonnance(models.Model):
    date = models.DateField(auto_now_add=True)
    medicaments = models.ManyToManyField(Medicament)

    def __str__(self):
        return f"Ordonnance du {self.date}"

#**************************************************************/
class ResultatBiologique(models.Model):
    parametre = models.CharField(max_length=100)  # Ex. Glycémie, Cholestérol
    valeurs = models.JSONField(default=list)  # Liste de valeurs biologiques
    unite = models.CharField(max_length=20)  # Ex. "mg/dL", "mmHg"

    def __str__(self):
        return f"{self.parametre} ({self.unite})"

#**************************************************************/
class Bilan(models.Model):
    TYPE_CHOICES = [
        ('Biologique', 'Biologique'),
        ('Radiologique', 'Radiologique'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date_bilan = models.DateField(auto_now_add=True)  # Date de création automatique
    resultat = models.OneToOneField(ResultatBiologique, on_delete=models.CASCADE)  

    def __str__(self):
        return f"Bilan {self.type} du {self.date_bilan}"

#**************************************************************/
class Soin(models.Model):
    observation = models.TextField()  # Observation sur le soin
    administration_medicaments = models.TextField()  # Administration des médicaments
    soins = models.TextField()  # Détails des soins effectués

    def __str__(self):
        return f"Soin {self.id} - Observation : {self.observation[:50]}..." 
#*************************************************************/
class Consultation(models.Model):
    date_consultation = models.DateField(auto_now_add=True)  # Date de la consultation (automatique)
    medecin_traitant = models.ForeignKey(Medecin, on_delete=models.CASCADE)  # Lien vers le médecin
    resume = models.TextField(blank=True, null=True)  # Résumé de la consultation
    bilans = models.ManyToManyField(Bilan, related_name='consultations')  # Liste des bilans associés
    ordonnances = models.ManyToManyField(Ordonnance, related_name='consultations')  # Liste des ordonnances associées

    def __str__(self):
        return f"Consultation du {self.date_consultation} - Dr. {self.medecin_traitant.nom}"

    def rediger_resume(self, texte):
        """
        Rédige ou met à jour le résumé de la consultation.
        """
        if not isinstance(texte, str):
            raise ValueError("Le résumé doit être une chaîne de caractères.")
        self.resume = texte
        self.save()  # Sauvegarde les modifications dans la base de données
#**************************************************************
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    date = models.DateField(auto_now_add=True)  # Automatically set the date to today
    time = models.TimeField(auto_now_add=True)  # Automatically set the time to now
    content = models.TextField()  # Content of the notification

    def __str__(self):
        return f"Notification for {self.user.nom} {self.user.prenom} on {self.date} at {self.time}"

