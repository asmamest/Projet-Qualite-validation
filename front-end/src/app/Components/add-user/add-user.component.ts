import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddUserRequest } from '../../models/AddUser-request.model';
import { AddUserResponse } from '../../models/AddUserResponse.model';
import{addUserService } from '../../services/addUser.service';

export enum Role {
  Responsable_etudes = 'Responsable_etudes',
  Chef_Dep_info = 'Chef_Dep_info',
  Chef_Dep_indus = 'Chef_Dep_indus',
  Chef_Dep_electrique = 'Chef_Dep_electrique',
  Responsable_examens = 'Responsable_examens',
  Responsable_Deliberation = 'Responsable_Deliberation'
}



@Component({
  selector: 'app-add-user',
  standalone:false,
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css']
})
export class AddUserComponent {
  firstname: string = '';
  lastname: string = '';
  mail: string = '';
  password: string = '';
  tel: string = '';
  username: string = '';
  role: Role | null = null;
  roles: any[] = [];

  isLoading = false;
  showNotification = false;
  notificationIsError = false;
  notificationMessage = '';

  constructor(
    private addUserService: addUserService,
    private router: Router
  ) {
    this.roles = Object.keys(Role).map(key => ({
      name: this.formatRoleName(key),
      value: Role[key as keyof typeof Role]
    }));
  }

  private formatRoleName(roleKey: string): string {
    return roleKey
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  addnewuser() {
    if (!this.firstname || !this.lastname || !this.mail || !this.password || !this.username || !this.role) {
      this.showNotificationMessage('Veuillez remplir tous les champs obligatoires', true);

      return;

    }

    this.isLoading = true;

    const adduserRequest: AddUserRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      mail: this.mail,
      password: this.password,
      tel: this.tel,
      username: this.username,
      role: this.role
    };

    this.addUserService.adduser(adduserRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showNotificationMessage('Utilisateur ajouté avec succès!', false);
        setTimeout(() => {
          this.router.navigate(['/addusers']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.message || 'Erreur lors de l\'ajout de l\'utilisateur';
        this.showNotificationMessage(errorMsg, true);
      }
    });
  }

  private showNotificationMessage(message: string, isError: boolean) {
    this.notificationMessage = message;
    this.notificationIsError = isError;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
