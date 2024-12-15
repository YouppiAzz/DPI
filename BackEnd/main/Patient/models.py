from django.db import models
from django.contrib.auth.models import User

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