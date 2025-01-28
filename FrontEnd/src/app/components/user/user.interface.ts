export interface User {
  id: number;
  dateCreation: string;
  dateDerniereAccede: string;
  nom: string;
  prenom: string;
  username: string;
  role: string;
  email?:string;
  password?: string;
  numSecu?: number;
}
