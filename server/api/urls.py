from django.urls import path
from .views import user_login, user_signup, weather_info

urlpatterns = [
    path('login/', user_login, name='login'),
    path('signup/', user_signup, name='signup'),
    path('weather/<str:lat>/<str:lon>/', weather_info, name='weather_info'),
]