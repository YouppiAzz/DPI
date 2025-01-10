from django.urls import path
from . import views

urlpatterns = [
    path("laboratorian/<int:laboratorian_id>/bilans/", views.BilanLaboratorianView.as_view(), name="laboratorian_bilans"),
]