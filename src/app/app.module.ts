import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from "src/auth-module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CvComponent, DialogOverviewExampleDialog} from './cv/cv.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth-guard';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CvCardsComponent, CvDialog, SendCvDialog} from './cv-cards/cv-cards.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manager',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['manager']
    }
  },
  {
    path: 'employee',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['employee']
    }
  }
]
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    CvComponent,
    ChatComponent,
    CalendarComponent,
    UsersComponent,
    SettingsComponent,
    DialogOverviewExampleDialog,
    CvCardsComponent,
    CvDialog,
    SendCvDialog,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScheduleModule,
    AuthModule,
    KeycloakAngularModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatGridListModule,
    MatTableModule,
    NgxDocViewerModule,
    HttpClientModule,

  ],
  exports:[RouterModule],
  providers: [ {provide: String, useValue: "dummy"}],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
