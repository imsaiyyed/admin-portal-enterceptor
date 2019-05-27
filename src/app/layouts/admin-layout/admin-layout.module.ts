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
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,  
} from '@angular/material';
import { CreateAccountComponent } from '../../create-account/create-account.component';
import { ClientDetailsComponent } from '../../client-details/client-details.component';
import { CreateClientComponent } from '../../create-client/create-client.component';
import { EmployeeDetailsComponent } from '../../employee-details/employee-details.component';
import { CreateEmployeeComponent } from '../../create-employee/create-employee.component';
import { ProjectAccountMappingComponent } from '../../project-account-mapping/project-account-mapping.component';
import { CerateProjectAccountMapComponent } from '../../cerate-project-account-map/cerate-project-account-map.component';
import { ProjectProfileComponent } from '../../project-profile/project-profile.component';
import { CreateProjectClientMapComponent } from '../../create-project-client-map/create-project-client-map.component';
import { EmployeeProfileComponent } from '../../employee-profile/employee-profile.component';
import { CreateProjectEmployeeMapComponent } from '../../create-project-employee-map/create-project-employee-map.component';
import { AccountProfileComponent } from '../../account-profile/account-profile.component';
import { ChannelConfigurationComponent } from '../../channel-configuration/channel-configuration.component';
import { ChannelCredentialsComponent } from '../../channel-credentials/channel-credentials.component';
import { ChangeChannelConfigComponent } from '../../change-channel-config/change-channel-config.component';
import { ChangeChannelCredsComponent } from '../../change-channel-creds/change-channel-creds.component';
import { TokenInterceptorService } from '../../services/auth-service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
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
    CreateEmployeeComponent,
    ProjectAccountMappingComponent,
    CerateProjectAccountMapComponent,
    CreateProjectClientMapComponent,
    CreateProjectEmployeeMapComponent,
    ProjectProfileComponent,
    EmployeeProfileComponent,
    AccountProfileComponent,
    ChannelConfigurationComponent,
    ChannelCredentialsComponent,
    ChangeChannelConfigComponent,
    ChangeChannelCredsComponent
  ],
  providers:[


   
    
  ],
  exports: [
    
    MatNativeDateModule,
  ],
  //For dynamically loaded components
  entryComponents:[
    ChangeChannelConfigComponent,
    ChangeChannelCredsComponent
  ]
})

export class AdminLayoutModule {}
