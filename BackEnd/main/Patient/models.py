from django.db import models
from django.contrib.auth.models import User
from Medecin.models import Medecin, Soin, Consultation,CustomUser



class Patient(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='patient_profile')
    social_security_number = models.CharField(max_length=20, unique=True)
    birth_date = models.DateField()
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    medical_insurance_provider = models.CharField(max_length=100)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)

    def __str__(self):
        return f"Patient {self.user.nom} {self.user.prenom} - {self.social_security_number}"


    # **************************************************************/
class DPI(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    mutuelle = models.CharField(max_length=100)
    poids = models.FloatField()
    groupe_sanguin = models.CharField(max_length=5)
    medecin_traitant = models.ForeignKey(Medecin, on_delete=models.CASCADE)
    date_creation = models.DateField(auto_now_add=True)
    soins = models.ManyToManyField(Soin, related_name='dpis')
    consultations = models.ManyToManyField(Consultation, related_name='dpis')

    def __str__(self):
        return f"{self.patient.user.nom} {self.patient.user.prenom} - NSS: {self.patient.social_security_number}"