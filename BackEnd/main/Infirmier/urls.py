from django.urls import path
from . import views

urlpatterns = [
    path("<int:infirmier_id>/patients/", views.PatientSoinView.as_view(), name="infirmier_patients_soin"),
]