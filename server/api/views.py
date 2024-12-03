from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from .models import User  # Import the custom User model
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.hashers import make_password
import jwt
from datetime import datetime, timedelta
import json

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username and not email:
            return JsonResponse({'message': 'Username or email is required'}, status=400)
        if not password:
            return JsonResponse({'message': 'Password is required'}, status=400)
        
        user = None
        if username:
            user = authenticate(request, username=username, password=password)
        if not user and email:
            user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, settings.SECRET_KEY, algorithm='HS256')
            return JsonResponse({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=400)
    return JsonResponse({'message': 'Invalid request method'}, status=405)

@csrf_exempt
def user_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        print(username, email, password)
        
        if not username:
            return JsonResponse({'message': 'Username is required'}, status=400)
        if not email:
            return JsonResponse({'message': 'Email is required'}, status=400)
        if not password:
            return JsonResponse({'message': 'Password is required'}, status=400)
        
        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            return JsonResponse({'message': 'User already exists'}, status=400)
        
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return JsonResponse({'message': 'Signup successful'})
    return JsonResponse({'message': 'Invalid request method'}, status=405)

def get_weather_data(lat, lon):
    url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {'error': str(e)}

def weather_info(request, lat, lon):
    data = get_weather_data(lat, lon)
    
    if 'error' in data:
        return JsonResponse({'status': 'error', 'message': 'Error fetching weather data', 'error': data['error']}, status=500)
    
    current_weather = {
        'temperature': data['current']['temp'],
        'humidity': data['current']['humidity'],
        'wind_speed': data['current']['wind_speed'],
        'feels_like': data['current']['feels_like'],
        'condition': data['current']['weather'][0]['description']
    }
    
    hourly_forecast = data.get('hourly', [])
    daily_forecast = data.get('daily', [])
    
    return JsonResponse({
        'status': 'success',
        'message': 'Weather data fetched successfully',
        'data': {
            'current_weather': current_weather,
            'hourly_forecast': hourly_forecast,
            'daily_forecast': daily_forecast
        }
    })