from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import SoinPatient

class PatientSoinView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, infirmier_id):
        try:

            soins = SoinPatient.objects.filter(infirmier_id=infirmier_id)
            
            if not soins.exists():
                return Response({"error": "Aucun soin trouvé pour cet infirmier"}, status=status.HTTP_404_NOT_FOUND)
                
                
            data = [
                {
                    "infirmier_id": soin.infirmier_id,
                    "infirmier_nom": soin.infirmier.user.nom,
                    "infirmier_prenom": soin.infirmier.user.prenom,
                    "id": soin.patient.id,
                    "nom": soin.patient.user.nom,
                    "prenom": soin.patient.user.prenom,
                    "email": soin.patient.user.email,
                    "numero_securite_sociale": soin.patient.social_security_number,
                    "date_naissance": soin.patient.birth_date,
                    "adresse": soin.patient.address,
                    "telephone": soin.patient.phone_number,
                    "fournisseur_assurance_maladie": soin.patient.medical_insurance_provider,
                    "contact_urgence_nom": soin.patient.emergency_contact_name,
                    "contact_urgence_telephone": soin.patient.emergency_contact_phone,
                    # include all the information to show in the list
                }
                for soin in soins
            ]
    
            return Response(data, status=status.HTTP_200_OK)
        except SoinPatient.DoesNotExist:
            return Response({"error": "Soin introuvable"}, status=status.HTTP_404_NOT_FOUND)

# type here