from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import BilanLabRad

class BilanLaboratorianView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, laboratorian_id):
        try:
            
            bilans = BilanLabRad.objects.filter(laboratorian_id=laboratorian_id)
            
            if not bilans.exists():
                return Response({"message": "Aucun bilan trouvé pour ce laboratorian"}, status=status.HTTP_404_NOT_FOUND)

            data = [
                {
                    "type": bilanlabrad.bilan.type,
                    "date_bilan": bilanlabrad.bilan.date_bilan,
                    "parametre_resultat": bilanlabrad.bilan.resultat.parametre,
                    "valeurs": bilanlabrad.bilan.resultat.valeurs,
                    "unite": bilanlabrad.bilan.resultat.unite,
                    "radiologue_nom": bilanlabrad.radiologue.user.nom,
                    "radiologue_prenom": bilanlabrad.radiologue.user.prenom,
                    "laboratorian_nom": bilanlabrad.laboratorian.user.nom,
                    "laboratorian_prenom": bilanlabrad.laboratorian.user.prenom,
                    # include all the information to show in the list
                }
                for bilanlabrad in bilans
            ]
    
            return Response(data, status=status.HTTP_200_OK)

        except BilanLabRad.DoesNotExist:
            return Response({"error": "Bilan introuvable"}, status=status.HTTP_404_NOT_FOUND)

# type here