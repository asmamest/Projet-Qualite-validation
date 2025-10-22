import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginRequest} from '../../models/login-request.model';
import {MessageService} from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../Services/token.service';
import {RoleService} from '../../Services/role.service';





@Component({
  selector: 'login',
  standalone:false,

  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']

})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private roleService: RoleService
  ) {}


  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.passwordVisible ? 'text' : 'password';
      const icon = document.querySelector('.toggle-password');
      if (icon) {
        icon.classList.toggle('pi-eye', this.passwordVisible);
        icon.classList.toggle('pi-eye-slash', !this.passwordVisible);
      }
    }
  }

  login() {
    this.loading = true;

    const loginRequest:LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(loginRequest).subscribe({
      next: (res) => {

        const token = res.token;
        localStorage.setItem('token', token);

        const role = TokenService.getRoleFromToken(token);

        const dashboardRoute = this.roleService.getDashboardRoute(role);

        console.log('User Role:', role);

        this.router.navigate([dashboardRoute]);

        this.messageService.add({
          severity: 'success',
          summary: 'Connexion réussie',
          life: 3000
        });
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.message || 'Échec de connexion',
          life: 5000
        });
      },
      complete: () => this.loading = false
    });
  }
}
