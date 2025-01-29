// src/app/models/dpi.models.ts

// Basic user information
export interface DPIUser {
  nom: string;
  prenom: string;
  email: string;
}

// Patient information
export interface DPIPatient {
  id: number;
  user: DPIUser;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  date_naissance: string;
  numero_securite_sociale: string;
  email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  medical_insurance_provider: string;
}

// Medical test results
export interface DPIResultat {
  parametre: string;
  valeurs: any;
  unite: string;
}

// Medical test
export interface DPIBilan {
  id: number;
  type: string;
  date_bilan: string;
  resultat: DPIResultat | null;
}

// Medication in prescription
export interface DPIMedicament {
  nom: string;
  dosage: string;
  duree: string;
}

// Prescription
export interface DPIOrdonnance {
  id: number;
  date: string;
  medicaments: DPIMedicament[];
}

// Consultation
export interface DPIConsultation {
  id: number;
  date_consultation: string;
  resume: string;
  medecin_traitant: string;
  bilans: DPIBilan[];
  ordonnances: DPIOrdonnance[];
}

// Care/Treatment
export interface DPISoin {
  id: number;
  observation: string;
  administration_medicaments: string;
  soins: string;
}

// Complete DPI (Patient Medical Record) - This is your main interface
export interface DPI {
  id: number;
  patient: DPIPatient[];
  mutuelle: string;
  poids: number;
  groupe_sanguin: string;
  medecin_traitant: string;
  date_creation: string;
  soins: DPISoin[];
  consultations: DPIConsultation[];
}
