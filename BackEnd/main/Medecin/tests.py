from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from datetime import datetime, date
from Medecin.models import CustomUser, Medecin
from Patient.models import Patient, DPI
import hashlib
import json

from main import settings


class TestSettings(APITestCase):
    def setUp(self):
        settings.REST_FRAMEWORK = {
            'DEFAULT_AUTHENTICATION_CLASSES': (
                'rest_framework_simplejwt.authentication.JWTAuthentication',
            )
        }


class DPITests(TestSettings):
    def setUp(self):
        super().setUp()
        # Create test user and authenticate
        self.user = CustomUser.objects.create(
            email="doctor@example.com",
            nom="Doctor",
            prenom="Test",
            user_type="medecin"
        )
        self.medecin = Medecin.objects.create(user=self.user)

        self.patient_user = CustomUser.objects.create(
            email="patient@example.com",
            nom="Patient",
            prenom="Test",
            user_type="patient"
        )
        self.patient = Patient.objects.create(
            user=self.patient_user,
            birth_date=date(1990, 1, 1),
            social_security_number="123456789",
            address="123 Test St",
            phone_number="1234567890"
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_dpi(self):
        """Test creating a new DPI record"""
        url = reverse('create-dpi')
        data = {
            "patient_id": self.patient.id,
            "medecin_traitant": self.medecin.id,
            "mutuelle": "Test Insurance",
            "poids": 70,
            "groupe_sanguin": "A+"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DPI.objects.count(), 1)
        self.assertEqual(DPI.objects.first().patient.id, self.patient.id)

    def test_list_dpi(self):
        """Test listing all DPI records"""
        DPI.objects.create(
            patient=self.patient,
            medecin_traitant=self.medecin,
            mutuelle="Test Insurance",
            poids=70,
            groupe_sanguin="A+"
        )

        url = reverse('liste_dpis')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_dpi_by_patient(self):
        """Test listing DPI records for a specific patient"""
        DPI.objects.create(
            patient=self.patient,
            medecin_traitant=self.medecin,
            mutuelle="Test Insurance",
            poids=70,
            groupe_sanguin="A+"
        )

        url = reverse('liste_dpis_par_patient', kwargs={'patient_id': self.patient.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class PatientListTests(TestSettings):
    def setUp(self):
        super().setUp()
        self.user = CustomUser.objects.create(
            email="doctor@example.com",
            nom="Doctor",
            prenom="Test",
            user_type="medecin"
        )
        self.client.force_authenticate(user=self.user)

        patient_user = CustomUser.objects.create(
            email="patient@example.com",
            nom="Patient",
            prenom="Test",
            user_type="patient"
        )
        self.patient = Patient.objects.create(
            user=patient_user,
            birth_date=date(1990, 1, 1),
            social_security_number="123456789",
            address="123 Test St",
            phone_number="1234567890"
        )

    def test_list_all_patients(self):
        """Test retrieving all patients"""
        url = reverse('liste_tous_patients')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['numero_securite_sociale'], "123456789")

    def test_search_patient_by_security_number(self):
        """Test searching for a patient by security number"""
        medecin = Medecin.objects.create(user=self.user)
        DPI.objects.create(
            patient=self.patient,
            medecin_traitant=medecin,
            mutuelle="Test Insurance",
            poids=70,
            groupe_sanguin="A+"
        )

        url = reverse('rechercher_dpi_par_num_securite_sociale',
                      kwargs={'num_securite_sociale': "123456789"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['patient'][0]['numero_securite_sociale'], "123456789")

    def test_list_patients_by_medecin(self):
        """Test listing patients for a specific doctor"""
        medecin = Medecin.objects.create(user=self.user)
        DPI.objects.create(
            patient=self.patient,
            medecin_traitant=medecin,
            mutuelle="Test Insurance",
            poids=70,
            groupe_sanguin="A+"
        )

        url = reverse('liste_patients_par_medecin', kwargs={'medecin_id': medecin.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)


class UserTests(TestSettings):
    def setUp(self):
        super().setUp()
        self.user = CustomUser.objects.create(
            email="admin@example.com",
            nom="Admin",
            prenom="Test",
            user_type="admin"
        )
        self.client.force_authenticate(user=self.user)

    def test_create_user(self):
        """Test creating a new user"""
        url = reverse('create-user')
        data = {
            "email": "newuser@example.com",
            "nom": "New",
            "prenom": "User",
            "user_type": "medecin",
            "password": "testpass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(CustomUser.objects.filter(email="newuser@example.com").exists())

    def test_list_users(self):
        """Test listing all users"""
        url = reverse('liste_users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)