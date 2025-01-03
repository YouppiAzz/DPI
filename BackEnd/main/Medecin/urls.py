from django.urls import path
from .views import ListeDPIView, ListeDPIParPatientView, ListeTousPatientsView, CreateDPIView, RechercherDPIParNumSecuView, ListePatientsParMedecinView

urlpatterns = [
    path('dpis/', ListeDPIView.as_view(), name='liste_dpis'),  # Liste de tous les DPI
    path('dpis/patient/<int:patient_id>/', ListeDPIParPatientView.as_view(), name='liste_dpis_par_patient'),  # Liste des DPI par patient
    path('patients/', ListeTousPatientsView.as_view(), name='liste_tous_patients'),  # Liste de tous les patients
     path('dpis/create/', CreateDPIView.as_view(), name='create-dpi'),
    path('dpis/rechercher/<str:num_securite_sociale>/', RechercherDPIParNumSecuView.as_view(), name='rechercher_dpi_par_num_securite_sociale'),  # Recherche de DPI par numéro de sécurité sociale
    path('patients/medecin/<int:medecin_id>/', ListePatientsParMedecinView.as_view(), name='liste_patients_par_medecin'),  # Liste des patients par médecin
