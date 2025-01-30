# views.py
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import hashlib
from Medecin.models import CustomUser
from Infirmier.models import Infirmier
from Radiologue.models import Radiologue
from Laboratorian.models import Laboratorian
from Medecin.models import Medecin


class CustomLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        hashed = hashlib.sha256(password.encode())
        hex_dig = hashed.hexdigest()

        # Check if the user exists
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate the user
        user = authenticate(request, username=email, password=hex_dig)

        user_info = CustomUser.objects.get(email=email)

        if user is not None:
            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user_type": user.user_type,  # Return the user's role for frontend handling
                "nom": user_info.nom,
                "prenom": user_info.prenom,
                "email": user_info.email,
                "id": user_info.id

            })
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Medecin, Notification
from Patient.models import Patient,DPI
from Medecin.models import CustomUserManager


class ListeDPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        dpis = DPI.objects.all()
        dpis_data = [
            {
                "id": dpi.id,
                 "patient":[
                   {            
                    "id": dpi.patient.id,
                    "nom": dpi.patient.user.nom,
                    "prenom": dpi.patient.user.prenom,
                    "adresse": dpi.patient.address,
                    "telephone": dpi.patient.phone_number,
                    "date_naissance": dpi.patient.birth_date,
                    "numero_securite_sociale": dpi.patient.social_security_number,
                    "email": dpi.patient.user.email,
                    "emergency_contact_name":dpi.patient. emergency_contact_name,
                    "emergency_contact_phone":dpi.patient.emergency_contact_phone,
                    "medical_insurance_provider":dpi.patient. medical_insurance_provider,
                   }
                 ],
                "mutuelle": dpi.mutuelle,
                "poids": dpi.poids,
                "groupe_sanguin": dpi.groupe_sanguin,
                "medecin_traitant": dpi.medecin_traitant.user.nom,
                "date_creation": dpi.date_creation,
                "soins": [
                    {
                        "id": soin.id,
                        "observation": soin.observation,
                        "administration_medicaments": soin.administration_medicaments,
                        "soins": soin.soins,
                    }
                    for soin in dpi.soins.all()
                ],
                "consultations": [
                    {
                        "id": consultation.id,
                        "date_consultation": consultation.date_consultation,
                        "resume": consultation.resume,
                        "medecin_traitant": consultation.medecin_traitant.user.nom,
                        "bilans": [
                            {
                                "id": bilan.id,
                                "type": bilan.type,
                                "date_bilan": bilan.date_bilan,
                                "resultat": {
                                    "parametre": bilan.resultat.parametre,
                                    "valeurs": bilan.resultat.valeurs,
                                    "unite": bilan.resultat.unite,
                                } if bilan.resultat else None,
                            }
                            for bilan in consultation.bilans.all()
                        ],
                        "ordonnances": [
                            {
                                "id": ordonnance.id,
                                "date": ordonnance.date,
                                "medicaments": [
                                    {
                                        "nom": medicament.nom,
                                        "dosage": medicament.dosage,
                                        "duree": medicament.duree,
                                    }
                                    for medicament in ordonnance.medicaments.all()
                                ],
                            }
                            for ordonnance in consultation.ordonnances.all()
                        ],
                    }
                    for consultation in dpi.consultations.all()
                ],
            }
            for dpi in dpis
        ]
        return Response(dpis_data, status=status.HTTP_200_OK)

class ListeDPIParPatientView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, patient_id):
        try:
            patient = Patient.objects.get(id=patient_id)
            dpis = DPI.objects.filter(patient=patient)
            dpis_data = [
                {
                    "id": dpi.id,
                    "patient":[
                   {            
                    "id": dpi.patient.id,
                    "nom": dpi.patient.user.nom,
                    "prenom": dpi.patient.user.prenom,
                    "adresse": dpi.patient.address,
                    "telephone": dpi.patient.phone_number,
                    "date_naissance": dpi.patient.birth_date,
                    "numero_securite_sociale": dpi.patient.social_security_number,
                    "email": dpi.patient.user.email,
                    "emergency_contact_name":dpi.patient. emergency_contact_name,
                    "emergency_contact_phone":dpi.patient.emergency_contact_phone,
                    "medical_insurance_provider":dpi.patient. medical_insurance_provider,
                   }
                    ],
                    "mutuelle": dpi.mutuelle,
                    "poids": dpi.poids,
                    "groupe_sanguin": dpi.groupe_sanguin,
                    "medecin_traitant": dpi.medecin_traitant.user.nom,
                    "date_creation": dpi.date_creation,
                    "soins": [
                        {
                            "id": soin.id,
                            "observation": soin.observation,
                            "administration_medicaments": soin.administration_medicaments,
                            "soins": soin.soins,
                        }
                        for soin in dpi.soins.all()
                    ],
                    "consultations": [
                        {
                            "id": consultation.id,
                            "date_consultation": consultation.date_consultation,
                            "resume": consultation.resume,
                            "medecin_traitant": consultation.medecin_traitant.user.nom,
                            "bilans": [
                                {
                                    "id": bilan.id,
                                    "type": bilan.type,
                                    "date_bilan": bilan.date_bilan,
                                    "resultat": {
                                        "parametre": bilan.resultat.parametre,
                                        "valeurs": bilan.resultat.valeurs,
                                        "unite": bilan.resultat.unite,
                                    } if bilan.resultat else None,
                                }
                                for bilan in consultation.bilans.all()
                            ],
                            "ordonnances": [
                                {
                                    "id": ordonnance.id,
                                    "date": ordonnance.date,
                                    "medicaments": [
                                        {
                                            "nom": medicament.nom,
                                            "dosage": medicament.dosage,
                                            "duree": medicament.duree,
                                        }
                                        for medicament in ordonnance.medicaments.all()
                                    ],
                                }
                                for ordonnance in consultation.ordonnances.all()
                            ],
                        }
                        for consultation in dpi.consultations.all()
                    ],
                }
                for dpi in dpis
            ]
            return Response(dpis_data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({"error": "Patient non trouvé"}, status=status.HTTP_404_NOT_FOUND)    


class ListeTousPatientsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patients = Patient.objects.all()
        patients_data = [
            {
                "id": patient.id,
                "nom": patient.user.nom,
                "prenom": patient.user.prenom,
                "email": patient.user.email,  # Ajout de l'email
                "numero_securite_sociale": patient.social_security_number,
                "date_naissance": patient.birth_date,
                "adresse": patient.address,
                "telephone": patient.phone_number,
                "fournisseur_assurance_maladie": patient.medical_insurance_provider,
                "contact_urgence_nom": patient.emergency_contact_name,
                "contact_urgence_telephone": patient.emergency_contact_phone,
            }
            for patient in patients
        ]
        return Response(patients_data, status=status.HTTP_200_OK)
class CreateDPIView(APIView):
   # permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            patient_id = request.data.get("patient_id")
            if not patient_id:
                return Response({"error": "L'ID du patient est requis"}, status=status.HTTP_400_BAD_REQUEST)
            
            patient = Patient.objects.get(user_id=patient_id)

            medecin_id = request.data.get("medecin_traitant_id")
            if not medecin_id:
                return Response({"error": "L'ID du médecin traitant est requis"}, status=status.HTTP_400_BAD_REQUEST)

            medecin = Medecin.objects.get(user_id=medecin_id)

            infirmier_id = request.data.get("infirmier_id")
            if not infirmier_id:
                return Response({"error": "L'ID de l'infirmier traitant est requis"}, status=status.HTTP_400_BAD_REQUEST)

            infirmier = Infirmier.objects.get(user_id=infirmier_id)
            
            # numero_securite_sociale = request.data.get("numero_securite_sociale")
            # date_naissance = request.data.get("date_naissance")
            # adresse = request.data.get("adresse")
            # telephone = request.data.get("telephone")
            # emergency_contact_name = request.data.get("emergency_contact_name")
            # emergency_contact_phone = request.data.get("emergency_contact_phone")

            patient_details = request.data.get("patient_details")
            numero_securite_sociale = patient_details.get("numero_securite_sociale")
            date_naissance = patient_details.get("date_naissance")
            adresse = patient_details.get("adresse")
            telephone = patient_details.get("telephone")
            emergency_contact_name = patient_details.get("emergency_contact_name")
            emergency_contact_phone = patient_details.get("emergency_contact_phone")



            #mutuelle = request.data.get("mutuelle")
            #poids = request.data.get("poids")
            #groupe_sanguin = request.data.get("groupe_sanguin")

            #dpi = DPI.objects.get(patient=patient)

            patient.social_security_number = numero_securite_sociale
            patient.birth_date = date_naissance
            patient.address = adresse
            patient.phone_number = telephone
            patient.emergency_contact_name = emergency_contact_name
            patient.emergency_contact_phone = emergency_contact_phone

            patient.save()

            dpi = DPI.objects.create(
                patient=patient,
                #mutuelle=mutuelle,
                poids=0,
                #groupe_sanguin=groupe_sanguin,
                medecin_traitant=medecin,
                #infirmier_traitant=infirmier,
            )

            dpi.soins.set([])  # Initialise les soins avec une liste vide
            dpi.consultations.set([])  # Initialise les consultations avec une liste vide
            dpi.save()

            return Response(
                {
                    "message": "DPI créé avec succès",
                    "dpi": {
                        "id": dpi.id,
                        "patient_nom": dpi.patient.user.nom,
                        "patient_prenom": dpi.patient.user.prenom,
                        "medecin_traitant": dpi.medecin_traitant.user.nom,
                        "mutuelle": dpi.mutuelle,
                        "poids": dpi.poids,
                        "groupe_sanguin": dpi.groupe_sanguin,
                        "date_creation": dpi.date_creation,  # La date est automatiquement définie
                        "soins": [],
                        "consultations": [],
                    }
                },
                status=status.HTTP_201_CREATED,
            )

        except Patient.DoesNotExist:
            return Response({"error": "Patient introuvable"}, status=status.HTTP_404_NOT_FOUND)
        except Medecin.DoesNotExist:
            return Response({"error": "Médecin introuvable"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RechercherDPIParNumSecuView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, num_securite_sociale):
        try:
            # Rechercher le patient par son numéro de sécurité sociale
            patient = Patient.objects.get(social_security_number=num_securite_sociale)

            # Récupérer les DPI associés à ce patient
            dpis = DPI.objects.filter(patient=patient)

            if not dpis.exists():
                return Response({"error": "Aucun DPI trouvé pour ce patient"}, status=status.HTTP_404_NOT_FOUND)

            # Formatage des données des DPI
            dpis_data = [
                {
                    "id": dpi.id,

                    "patient":[
                   {            
                    "id": dpi.patient.id,
                    "nom": dpi.patient.user.nom,
                    "prenom": dpi.patient.user.prenom,
                    "adresse": dpi.patient.address,
                    "telephone": dpi.patient.phone_number,
                    "date_naissance": dpi.patient.birth_date,
                    "numero_securite_sociale": dpi.patient.social_security_number,
                    "email": dpi.patient.user.email,
                    "emergency_contact_name":dpi.patient. emergency_contact_name,
                    "emergency_contact_phone":dpi.patient.emergency_contact_phone,
                    "medical_insurance_provider":dpi.patient. medical_insurance_provider,
                   }
                    ],
                    "mutuelle": dpi.mutuelle,
                    "poids": dpi.poids,
                    "groupe_sanguin": dpi.groupe_sanguin,
                    "medecin_traitant": dpi.medecin_traitant.user.nom,
                    "date_creation": dpi.date_creation,
                    "soins": [
                        {
                            "id": soin.id,
                            "observation": soin.observation,
                            "administration_medicaments": soin.administration_medicaments,
                            "soins": soin.soins,
                        }
                        for soin in dpi.soins.all()
                    ],
                    "consultations": [
                        {
                            "id": consultation.id,
                            "date_consultation": consultation.date_consultation,
                            "resume": consultation.resume,
                            "medecin_traitant": consultation.medecin_traitant.user.nom,
                        }
                        for consultation in dpi.consultations.all()
                    ],
                }
                for dpi in dpis
            ]

            return Response(dpis_data, status=status.HTTP_200_OK)

        except Patient.DoesNotExist:
            return Response({"error": "Patient avec ce numéro de sécurité sociale introuvable"}, status=status.HTTP_404_NOT_FOUND)

class ListePatientsParMedecinView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, medecin_id):
        try:
            # Rechercher le médecin par son ID
            medecin = Medecin.objects.get(id=medecin_id)

            # Récupérer les DPI associés à ce médecin (les patients associés)
            dpis = DPI.objects.filter(medecin_traitant=medecin)

            if not dpis.exists():
                return Response({"error": "Aucun patient trouvé pour ce médecin"}, status=status.HTTP_404_NOT_FOUND)

            # Formatage des données des patients
            patients_data = [
                {
                    "id": dpi.patient.id,
                    "nom": dpi.patient.user.nom,
                    "prenom": dpi.patient.user.prenom,
                    "adresse": dpi.patient.address,
                    "telephone": dpi.patient.phone_number,
                    "date_naissance": dpi.patient.birth_date,
                    "numero_securite_sociale": dpi.patient.social_security_number,
                    "email": dpi.patient.user.email,
                    "emergency_contact_name":dpi.patient. emergency_contact_name,
                    "emergency_contact_phone":dpi.patient.emergency_contact_phone,
                    "medical_insurance_provider":dpi.patient. medical_insurance_provider,
                }
                for dpi in dpis
            ]

            return Response(patients_data, status=status.HTTP_200_OK)

        except Medecin.DoesNotExist:
            return Response({"error": "Médecin introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
class NotificationView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        try:
            notifications = Notification.objects.filter(user_id=user_id)
            
            if not notifications.exists():
                return Response({"message": "Aucune notification trouvée"}, status=status.HTTP_404_NOT_FOUND)

            data = [
                {
                    "user_id": notification.user_id,
                    "user_nom": notification.user.nom,
                    "user_prenom": notification.user.prenom,
                    "date": notification.date,
                    "time": notification.time,
                    "content": notification.content,
                }
                for notification in notifications
            ]
            
            return Response(data, status=status.HTTP_200_OK)
                
            
        except Notification.DoesNotExist:
            return Response({"error": "Notification introuvable"}, status=status.HTTP_404_NOT_FOUND)

class AddNotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)

            content = request.data.get("content")
            if not content:
                return Response({"error": "Le contenu de la notification est obligatoire"}, status=status.HTTP_400_BAD_REQUEST)

            notification = Notification.objects.create(user=user, content=content)
            notification.save()

            return Response(
                {
                    "message": "Notification added successfully.",
                    "notification": {
                        "user_id": notification.user.id,
                        "user_name": f"{notification.user.nom} {notification.user.prenom}",
                        "date": notification.date,
                        "time": notification.time,
                        "content": notification.content,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#
class UsersView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            users = CustomUser.objects.all()
            users_data = [
                {
                    "id": user.id,
                    "nom": user.nom,
                    "prenom": user.prenom,
                    "email": user.email,
                    "user_type": user.user_type,
                }
                for user in users
            ]
            return Response(users_data, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
from django.contrib.auth.hashers import make_password
#
class AddUserView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        try:

            # manager = CustomUserManager()

            email = request.data.get("email")
            nom = request.data.get("nom")
            prenom = request.data.get("prenom")
            user_type = request.data.get("user_type")
            password = request.data.get("password")
            hash_object = hashlib.sha256(password.encode())
            hex_dig = hash_object.hexdigest()


            if not email or not nom or not prenom or not user_type or not password:
                return Response({"error": "Veuillez remplir tous les champs"}, status=status.HTTP_400_BAD_REQUEST)

            user = CustomUser.objects.create(email=email, nom=nom, prenom=prenom, user_type=user_type, password=hex_dig)  
            user.save()

            type_of_user = user_type.lower()

            match type_of_user:
                case 'medecin':
                    medecin = Medecin.objects.create(user_id=user.id, specialite='General')
                    medecin.save()
                case 'infirmier':
                    infirmier = Infirmier.objects.create(user_id=user.id, Domaine='General')
                    infirmier.save()
                case 'radiologue':
                    radiologue = Radiologue.objects.create(user_id=user.id, Domaine='General')
                    radiologue.save()
                case 'laboratorian':
                    laboratorian = Laboratorian.objects.create(user_id=user.id, Domaine='General')
                    laboratorian.save()
                case 'patient':
                    patient = Patient.objects.create(user_id=user.id, address='Alger', phone_number='0987', birth_date='2000-01-01', social_security_number='111', emergency_contact_name='Emergency_name', emergency_contact_phone='911', medical_insurance_provider='MIP')
                    patient.save()

            return Response(
                {
                    "message": "Utilisateur ajouté avec succès.",
                    "user": {
                        "id": user.id,
                        "nom": user.nom,
                        "prenom": user.prenom,
                        "email": user.email,
                        "user_type": user.user_type,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
