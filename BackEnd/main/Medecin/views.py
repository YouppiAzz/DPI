from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Medecin
from Patient.models import Patient



class Laborantin:
    pass
class Radiologue:
    pass
class Infirmier:
    pass

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(request, username=email, password=password)

    if user:
        # Generate a refresh token for the authenticated user
        refresh = RefreshToken.for_user(user)

        # Try to get the user type (Medecin, Patient, Infirmier, Labo, Radiologue)
        try:
            # Check if user is a Medecin
            medecin = Medecin.objects.get(user=user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'nom': medecin.nom,
                    'prenom': medecin.prenom,
                    'specialite': medecin.specialite,
                    'user_type': 'medecin'
                }
            })
        except Medecin.DoesNotExist:
            pass

        try:
            # Check if user is a Patient
            patient = Patient.objects.get(user=user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': patient.first_name,
                    'last_name': patient.last_name,
                    'medical_insurance_provider': patient.medical_insurance_provider,
                    'user_type': 'patient'
                }
            })
        except Patient.DoesNotExist:
            pass

        try:
            # Check if user is an Infirmier
            infirmier = Infirmier.objects.get(user=user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': 'infirmier'
                }
            })
        except Infirmier.DoesNotExist:
            pass

        try:
            # Check if user is a Labo staff
            laborantin = Laborantin.objects.get(user=user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': 'labo'
                }
            })
        except Laborantin.DoesNotExist:
            pass

        try:
            # Check if user is a Radiologue
            radiologue = Radiologue.objects.get(user=user)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': 'radiologue'
                }
            })
        except Radiologue.DoesNotExist:
            pass

        # If no matching user type found
        return Response({'error': 'Invalid credentials or user type'}, status=400)

    return Response({'error': 'Invalid credentials'}, status=400)
