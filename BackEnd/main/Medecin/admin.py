from django.contrib import admin
from .models import CustomUser, Medecin
from Patient.models import Patient
from Infirmier.models import Infirmier
from Radiologue.models import Radiologue
from Laboratorian.models import Laboratorian

# Admin for CustomUser
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'nom', 'prenom', 'user_type', 'is_staff', 'is_active']
    list_filter = ['user_type', 'is_staff', 'is_active']
    search_fields = ['email', 'nom', 'prenom']
    ordering = ['email']

    # If you want to allow easy creation of users, you could include a form with additional fields
    fieldsets = (
        (None, {'fields': ('email', 'password', 'nom', 'prenom', 'user_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2', 'nom', 'prenom', 'user_type')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)

# Admin for Medecin
class MedecinAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialite']
    search_fields = ['user__email', 'user__nom', 'specialite']
    list_filter = ['specialite']

admin.site.register(Medecin, MedecinAdmin)

# Admin for Infirmier
class InfirmierAdmin(admin.ModelAdmin):
    list_display = ['user', 'Domaine']
    search_fields = ['user__email', 'user__nom', 'Domaine']
    list_filter = ['Domaine']

admin.site.register(Infirmier, InfirmierAdmin)

# Admin for Patient
class PatientAdmin(admin.ModelAdmin):
    list_display = ['user', 'social_security_number', 'birth_date', 'address']
    search_fields = ['user__email', 'user__nom', 'social_security_number']
    list_filter = ['birth_date']

admin.site.register(Patient, PatientAdmin)

# Admin for Radiologue
class RadiologueAdmin(admin.ModelAdmin):
    list_display = ['user', 'Domaine']
    search_fields = ['user__email', 'user__nom', 'Domaine']
    list_filter = ['Domaine']

admin.site.register(Radiologue, RadiologueAdmin)

# Admin for Laboratorian
class LaboratorianAdmin(admin.ModelAdmin):
    list_display = ['user', 'Domaine']
    search_fields = ['user__email', 'user__nom', 'Domaine']
    list_filter = ['Domaine']

admin.site.register(Laboratorian, LaboratorianAdmin)
