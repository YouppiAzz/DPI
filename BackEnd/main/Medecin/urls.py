from django.urls import path
from Patient.views import creer_dpi

urlpatterns = [
     path('creer-dpi/', creer_dpi, name='creer_dpi'),

]
