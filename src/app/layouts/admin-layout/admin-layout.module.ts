import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CompanyDetailsComponent } from '../../company-details/company-details.component';
import { ProjectDetailsComponent } from '../../project-details/project-details.component';
import { CreateProjectComponent } from '../../create-project/create-project.component';
import { AccountDetailsComponent } from '../../account-details/account-details.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from  'ngx-ui-loader';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatBadgeModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  
} from '@angular/material';
import { CreateAccountComponent } from '../../create-account/create-account.component';
import { ClientDetailsComponent } from '../../client-details/client-details.component';
import { CreateClientComponent } from '../../create-client/create-client.component';
import { EmployeeDetailsComponent } from '../../employee-details/employee-details.component';
import { CreateEmployeeComponent } from '../../create-employee/create-employee.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'red',
  bgsSize: 40,
  fgsType:SPINNER.threeStrings,
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSnackBarModule,
  
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CompanyDetailsComponent,
    ProjectDetailsComponent,
    CreateProjectComponent,
    AccountDetailsComponent,
    CreateAccountComponent,
    ClientDetailsComponent,
    CreateClientComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent

  ],
  providers:[
  ],
  exports: [
    
    MatNativeDateModule,
  ]
})

export class AdminLayoutModule {}
