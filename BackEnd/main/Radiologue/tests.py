from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Infirmier
from django.contrib.auth.hashers import make_password


class LoginViewTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.infirmier = Infirmier.objects.create(
            email="test1@example.com",
            password=make_password("password456"),  # Hash the password
            nom="Joe",
            prenom="Mama",
            specialite="Yappologie"
        )
        self.client = APIClient()
        self.url = reverse('login')  # Replace with the actual name of your URL pattern

    def test_login_success(self):
        # Simulate a successful login
        response = self.client.post(self.url, {
            "email": "test1@example.com",
            "password": "password456"
        }, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['email'], self.infirmier.email)

    def test_login_failure(self):
        # Simulate a failed login
        response = self.client.post(self.url, {
            "email": "wrong@example.com",
            "password": "wrongpassword"
        }, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
