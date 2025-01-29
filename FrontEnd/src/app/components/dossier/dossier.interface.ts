export interface Dossier {
  id: number;
  // dateCreation: string;
  // dateDerniereModification: string;
  nom: string;
  prenom: string;
  numSecu?: string;
  dateNaissance?: string;
  adresse?: string;
  numTel?: string;
  nomContact?: string;
  numTelContact?: string;
  medecin: string;
  infirmier?: string;
  ordonnances?: string[];
  bilanRadios?: string[];
  bilanLaborantins?: string[];
}
