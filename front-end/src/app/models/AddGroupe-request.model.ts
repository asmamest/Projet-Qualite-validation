import {Speciality,Departement,Level} from '../Components/niveau-groupe/niveau-groupe.component';


export interface AddGroupeRequest {
  name:string,
  departement:Departement,
  speciality:Speciality,
  level:Level
}
