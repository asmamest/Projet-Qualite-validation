import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/component/layout/layout.component';
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { AddEnseignantComponent } from './Components/add-enseignant/add-enseignant.component';
import { AddMatiereComponent } from './Components/add-matiere/add-matiere.component';
import { ListMatieresComponent } from './Components/list-matieres/list-matieres.component';
import { ChartInfoComponent } from './Components/pages/Departments/dep-info/chart-info/chart-info.component';
import { LoginComponent } from './Components/login/login.component';
import { DepartementsComponent } from './Components/departements/departements.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { NiveauGroupeComponent } from './Components/niveau-groupe/niveau-groupe.component';
import { EnseignantListComponent } from './Components/enseignant-list/enseignant-list.component';
import {ProfileComponent} from './Components/profil/profil.component';

import { ProfilePictureUploadComponent } from './Components/profile-picture-upload/profile-picture-upload.component';

import { ListMatieresComponentWithMail } from './Components/list-matieres-component-with-mail/list-matieres-component-with-mail.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { EmailLogsComponent } from './Components/email-logs/email-logs.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './Components/unauthorized/unauthorized.component';

import { DashboardInfoComponent } from './Components/dashboard-info/dashboard-info.component';
import { DashboardIndusComponent } from './Components/dashboard-indus/dashboard-indus.component';
import { ElectriqueSpecialiteComponent } from './Components/electrique-specialite/electrique-specialite.component';
import { DashboardMecaComponent } from './Components/dashboard-meca/dashboard-meca.component';
import { DashboardInfotrComponent } from './Components/dashboard-infotr/dashboard-infotr.component';
import {SidebarDepComponent} from './Components/sidebar-dep/sidebar-dep.component';
import { AppCalendarComponent } from './Components/app-calendar/app-calendar.component';



const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Admin routes
  //{ path: 'departments', component: DepartementsComponent },

  { path: 'addusers',
    component: AddUserComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Responsable_etudes' }

  },
 // { path: 'niveau-groupe', component: NiveauGroupeComponent },

  // Layout and Dashboard
  { path: 'layout', component: LayoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },


  // Other routes
  { path: 'enseignants', component: AddEnseignantComponent },

  { path: 'add-enseignant',
    component: AddEnseignantComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Responsable_etudes'}},

  { path: 'add-matiere',
    component: AddMatiereComponent,
    canActivate: [RoleGuard] ,
    data: { expectedRole: 'Responsable_etudes'}}
  ,
  { path: 'matieres', component: AddMatiereComponent },

  { path: 'list-matiere', component: ListMatieresComponent },
  { path: 'list-matiere-withmail', component: ListMatieresComponentWithMail },


  { path: 'list-enseignants', component: EnseignantListComponent },

  { path: 'chartinfo', component: ChartInfoComponent },

  {path:'profile', component: ProfileComponent },

  {path:'dashboard-info', component: DashboardInfoComponent },
  {path:'dashboard-idus', component: DashboardIndusComponent },
  {path:'dashboard-meca', component: DashboardMecaComponent },
  {path:'dashboard-infotr',component:DashboardInfotrComponent,},

  {path:'profile-picture', component: ProfilePictureUploadComponent},

  {path:'appcalendar', component: AppCalendarComponent },

  {path:'Emails', component: EmailLogsComponent },

  {path:'electrique-specialite', component: ElectriqueSpecialiteComponent },

  {path:'sidebardep', component: SidebarDepComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
