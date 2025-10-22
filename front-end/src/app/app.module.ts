import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { UIChart } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Listbox } from 'primeng/listbox';
import { StyleClass } from 'primeng/styleclass';
import { SelectButton } from 'primeng/selectbutton';
import { Fluid } from 'primeng/fluid';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

// Components
import { TopbarComponent } from './Components/layout/component/topbar/topbar.component';
import { SidebarComponent } from './Components/layout/component/sidebar/sidebar.component';
import { MenuitemComponent } from './Components/layout/component/menuitem/menuitem.component';
import { MenuComponent } from './Components/layout/component/menu/menu.component';
import { FooterComponent } from './Components/layout/component/footer/footer.component';
import { FloatingconfiguratorComponent } from './Components/layout/component/floatingconfigurator/floatingconfigurator.component';
import { ConfiguratorComponent } from './Components/layout/component/configurator/configurator.component';
import { LayoutComponent } from './Components/layout/component/layout/layout.component';
// Pages and widgets
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { HistoryWidgetComponent } from './Components/pages/dashboard/components/history-widget/history-widget.component';
import { NotificationsWidgetComponent } from './Components/pages/dashboard/components/notifications-widget/notifications-widget.component';
import { StatsWidgetComponent } from './Components/pages/dashboard/components/stats-widget/stats-widget.component';
import { ValidationStreamWidgetComponent } from './Components/pages/dashboard/components/validation-stream-widget/validation-stream-widget.component';
import { LandingComponent } from './Components/pages/landing/landing.component';
import { FeatureswidgetComponent } from './Components/pages/landing/components/featureswidget/featureswidget.component';
import { FooterwidgetComponent } from './Components/pages/landing/components/footerwidget/footerwidget.component';
import { TopbarwidgetComponent } from './Components/pages/landing/components/topbarwidget/topbarwidget.component';

// Add/modify components
import { AddMatiereComponent } from './Components/add-matiere/add-matiere.component';
import { ListMatieresComponent } from './Components/list-matieres/list-matieres.component';
import { AddEnseignantComponent } from './Components/add-enseignant/add-enseignant.component';
import { LoginComponent } from './Components/login/login.component';
import { DepartementsComponent } from './Components/departements/departements.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { NiveauGroupeComponent } from './Components/niveau-groupe/niveau-groupe.component';

// PrimeNG Message Service

import { MessageService } from 'primeng/api';
import {Menu} from "primeng/menu";
import {ChartInfoComponent} from "./Components/pages/Departments/dep-info/chart-info/chart-info.component";
import {Dialog} from "primeng/dialog";
import { EnseignantListComponent } from './Components/enseignant-list/enseignant-list.component';
import { ProfileComponent } from './Components/profil/profil.component';
import { ProfilePictureUploadComponent } from './Components/profile-picture-upload/profile-picture-upload.component';
import { ListMatieresComponentWithMail } from './Components/list-matieres-component-with-mail/list-matieres-component-with-mail.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { EmailLogsComponent } from './Components/email-logs/email-logs.component';
import { BaseChartDirective } from 'ng2-charts';
import { UnauthorizedComponent } from './Components/unauthorized/unauthorized.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DateGlobaleFormComponent } from './Components/pages/dashboard/components/date-globale-form/date-globale-form.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashboardInfoComponent } from './Components/dashboard-info/dashboard-info.component';
import { Chart } from 'chart.js';
import { DashboardIndusComponent } from './Components/dashboard-indus/dashboard-indus.component';
import { ElectriqueSpecialiteComponent } from './Components/electrique-specialite/electrique-specialite.component';
import { DashboardMecaComponent } from './Components/dashboard-meca/dashboard-meca.component';
import { DashboardInfotrComponent } from './Components/dashboard-infotr/dashboard-infotr.component';
import { SidebarDepComponent } from './Components/sidebar-dep/sidebar-dep.component';
import { CommonModule } from '@angular/common';
import { AppCalendarComponent } from './Components/app-calendar/app-calendar.component';
Chart.register(ChartDataLabels);






@NgModule({

})
export class TopbarModule {}




@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppCalendarComponent,
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    MenuitemComponent,
    LayoutComponent,
    MenuComponent,
    FooterComponent,
    FloatingconfiguratorComponent,
    ConfiguratorComponent,
    DashboardComponent,
    HistoryWidgetComponent,
    NotificationsWidgetComponent,
    StatsWidgetComponent,
    ValidationStreamWidgetComponent,
    LandingComponent,
    FeatureswidgetComponent,
    FooterwidgetComponent,
    TopbarwidgetComponent,
    AddMatiereComponent,
    ListMatieresComponent,
    AddEnseignantComponent,
    LoginComponent,
    DepartementsComponent,
    AddUserComponent,
    NiveauGroupeComponent,
    ChartInfoComponent,
    EnseignantListComponent,
    ProfileComponent,
    ProfilePictureUploadComponent,
    ListMatieresComponentWithMail,
    CalendarComponent,
    EmailLogsComponent,
    ChartInfoComponent,
    UnauthorizedComponent,
    DateGlobaleFormComponent,
    DashboardInfoComponent,
    DashboardIndusComponent,
    ElectriqueSpecialiteComponent,
    DashboardMecaComponent,
    DashboardInfotrComponent,
    SidebarDepComponent],

  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    BaseChartDirective,
    MatSnackBarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    BadgeModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    UIChart,
    ToastModule,
    RippleModule,
    InputGroupModule,
    InputGroupAddonModule,
    StyleClass,
    SelectButton,
    //provideAnimations(),
    Fluid,
    CardModule,
    PasswordModule,
    Listbox,
    Menu,
    Dialog,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    MessageService
  ],
  exports: [
    TopbarComponent
  ]
})
export class AppModule {}
