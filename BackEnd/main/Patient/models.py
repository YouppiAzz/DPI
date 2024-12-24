from django.db import models
from django.contrib.auth.models import User
from Medecin.models import Medecin, Soin, Consultation


class Patient(models.Model):
    social_security_number = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    medical_insurance_provider = models.CharField(max_length=100)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.social_security_number})"

    # **************************************************************/
class DPI(models.Model):
        nss = models.IntegerField(unique=True)
        patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
        mutuelle = models.CharField(max_length=100)
        poids = models.FloatField()
        groupe_sanguin = models.CharField(max_length=5)
        medecin_traitant = models.ForeignKey(Medecin, on_delete=models.CASCADE)
        date_creation = models.DateField(auto_now_add=True)
        soins = models.ManyToManyField(Soin, related_name='dpis')
        # Liste des consultations associées à ce DPI
        consultations = models.ManyToManyField(Consultation, related_name='dpis')

        def __str__(self):
            return f"{self.nom} {self.prenom} - NSS: {self.nss}"
    # ****************************************************************/