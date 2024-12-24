from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Medecin
from django.contrib.auth.hashers import make_password


class LoginViewTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.medecin = Medecin.objects.create(
            email="test@example.com",
            password=make_password("password123"),  # Hash the password
            nom="Doe",
            prenom="John",
            specialite="Cardiology"
        )
        self.client = APIClient()
        self.url = reverse('login')  # Replace with the actual name of your URL pattern

    def test_login_success(self):
        # Simulate a successful login
        response = self.client.post(self.url, {
            "email": "test@example.com",
            "password": "password123"
        }, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['email'], self.medecin.email)

    def test_login_failure(self):
        # Simulate a failed login
        response = self.client.post(self.url, {
            "email": "wrong@example.com",
            "password": "wrongpassword"
        }, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
