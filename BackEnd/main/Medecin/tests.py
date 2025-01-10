from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from Medecin.models import CustomUser

class LoginAPITest(TestCase):
    def setUp(self):
        # Set up a test user
        self.test_user = CustomUser.objects.create_user(
            email="a@a.com",
            password="aa",
            user_type="patient"  # Replace with the actual type
        )
        self.login_url = reverse('custom_login')  # Update with the correct name of your login API route
        self.client = APIClient()

    def test_valid_login(self):
        """Test if valid login returns a token and user_type"""
        response = self.client.post(
            self.login_url,
            {"email": "a@a.com", "password": "aa"},
            format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("user_type", response.data)
        self.assertEqual(response.data["user_type"], "patient")  # Replace with the expected user type

    def test_invalid_login(self):
        """Test if invalid login credentials return an error"""
        response = self.client.post(
            self.login_url,
            {"email": "invalid@a.com", "password": "wrong"},
            format="json"
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data["detail"], "Invalid credentials")

    def test_role_field(self):
        """Test if the role is included in the response"""
        response = self.client.post(
        self.login_url,
        {"email": "a@a.com", "password": "aa"},
        format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["user_type"], self.test_user.user_type)
