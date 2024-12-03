
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
import json

User = get_user_model()

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.weather_url = reverse('weather_info', args=['35.6895', '139.6917'])
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        }

    def test_user_signup(self):
        response = self.client.post(self.signup_url, data=json.dumps(self.user_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Signup successful')
        self.assertTrue(User.objects.filter(username=self.user_data['username']).exists())

    def test_user_login(self):
        User.objects.create_user(**self.user_data)
        response = self.client.post(self.login_url, data=json.dumps(self.user_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Login successful')
        self.assertIn('token', response.json())

    def test_weather_info(self):
        response = self.client.get(self.weather_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')
        self.assertIn('current_weather', response.json()['data'])