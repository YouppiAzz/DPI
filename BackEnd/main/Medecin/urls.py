from django.urls import path
from . import views

urlpatterns = [
    path('creer_dpi/', views.creer_dpi, name='creer_dpi'),
    path('consulter_dpi/', views.consulter_dpi, name='consulter_dpi'),
]
