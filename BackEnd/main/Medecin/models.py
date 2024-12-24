from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

#**************************************************************/
class MedecinManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        user = self.model(email=email.lower(), **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user


class Medecin(AbstractBaseUser, PermissionsMixin):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    specialite = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    objects = MedecinManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'specialite']

    def __str__(self):
        return f"Dr. {self.nom} {self.prenom} - {self.specialite}"

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

