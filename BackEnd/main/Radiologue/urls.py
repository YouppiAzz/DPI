from django.urls import path
from . import views

urlpatterns = [
    path("radiologue/<int:radiologue_id>/bilans/", views.BilanRadiologueView.as_view(), name="radiologue_bilans"),
]