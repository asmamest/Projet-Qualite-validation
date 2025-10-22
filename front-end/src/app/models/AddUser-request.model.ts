import {Role} from '../Components/add-user/add-user.component';

export interface AddUserRequest {

  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  tel: string;
  username: string;
  role:Role ;
}
