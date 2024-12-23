from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import DPI, Medecin

@csrf_exempt  # Pour désactiver temporairement la protection CSRF (si API)
def creer_dpi(request):
    if request.method == 'POST':  # S'assurer que la méthode est POST
        try:
            # Charger les données JSON
            data = json.loads(request.body)

            # Récupérer les données nécessaires
            nss = data.get('nss')
            code_QR = data.get('code_QR')
            nom = data.get('nom')
            prenom = data.get('prenom')
            date_naissance = data.get('date_naissance')
            adresse = data.get('adresse')
            telephone = data.get('telephone')
            telephone_urgence = data.get('telephone_urgence')
            mutuelle = data.get('mutuelle')
            poids = data.get('poids')
            groupe_sanguin = data.get('groupe_sanguin')
            medecin_id = data.get('medecin_traitant')  # ID du médecin

            # Vérification : le médecin existe ?
            medecin = Medecin.objects.get(id=medecin_id)

            # Création du DPI
            dpi = DPI.objects.create(
                nss=nss,
                code_QR=code_QR,
                nom=nom,
                prenom=prenom,
                date_naissance=date_naissance,
                adresse=adresse,
                telephone=telephone,
                telephone_urgence=telephone_urgence,
                mutuelle=mutuelle,
                poids=poids,
                groupe_sanguin=groupe_sanguin,
                medecin_traitant=medecin
            )

            # Réponse JSON
            return JsonResponse({
                "message": "DPI créé avec succès.",
                "dpi_id": dpi.id
            }, status=201)

        except Medecin.DoesNotExist:
            return JsonResponse({"error": "Médecin introuvable."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    # Si ce n'est pas une méthode POST
    return JsonResponse({"error": "Méthode non autorisée."}, status=405)
