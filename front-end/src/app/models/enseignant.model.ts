import { typeMatiereEnum } from './enums';

export enum GroupeEnum {
  Groupe_A = 'Groupe_A',
  Groupe_B = 'Groupe_B',
  Groupe_C = 'Groupe_C',
  Groupe_D = 'Groupe_D',
  Groupe_E = 'Groupe_E'
}

export enum NiveauEnum {
  NIVEAU_1 = 'NIVEAU_1',
  NIVEAU_2 = 'NIVEAU_2',
  NIVEAU_3 = 'NIVEAU_3'
}

export enum SpecialiteEnum {
  INFORMATIQUE = 'INFORMATIQUE',
  MECATRONIQUE = 'MECATRONIQUE',
  INDUS = 'INDUS',
  INFOTRONIQUE = 'INFOTRONIQUE'
}

export enum DepartementEnum {
  INFORMATIQUE = 'INFORMATIQUE',
  ELECTRIQUE = 'ELECTRIQUE',
  INDUS = 'INDUS'
}

export enum SemesterEnum {
  SEMESTER1='SEMESTER1',
  SEMESTER2='SEMESTER2',
  RATTRAPAGE='RATTRAPAGE'

}
export enum TypeMatiereEnum{
  DS='DS',
  EXAMEN='EXAMEN',
  TP='TP',
  PROJET='PROJET'
}
export interface Enseignant {
  id?: number;
  nom: string;
  email: string;
  matieres: string[];
  groupe: GroupeEnum;
  niveau: NiveauEnum;
  specialite: SpecialiteEnum;
  departement: DepartementEnum;
  semester: SemesterEnum;
  typeMatiere: typeMatiereEnum;
}
