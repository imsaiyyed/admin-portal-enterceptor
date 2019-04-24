import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { CompanyDetailsComponent } from "../../company-details/company-details.component";
import { ProjectDetailsComponent } from "../../project-details/project-details.component";
import { CreateProjectComponent } from "../../create-project/create-project.component";
import { AccountDetailsComponent } from "../../account-details/account-details.component";
import { CreateAccountComponent } from "../../create-account/create-account.component";
import { ClientDetailsComponent } from "../../client-details/client-details.component";
import { CreateClientComponent } from "../../create-client/create-client.component";
import { EmployeeDetailsComponent } from "../../employee-details/employee-details.component";
import { CreateEmployeeComponent } from "../../create-employee/create-employee.component";
import { ProjectAccountMappingComponent } from "../../project-account-mapping/project-account-mapping.component";
import { CerateProjectAccountMapComponent } from "../../cerate-project-account-map/cerate-project-account-map.component";
import { ProjectProfileComponent } from "../../project-profile/project-profile.component";
import { CreateProjectClientMapComponent } from "../../create-project-client-map/create-project-client-map.component";
import { EmployeeProfileComponent } from "../../employee-profile/employee-profile.component";
import { CreateProjectEmployeeMapComponent } from "../../create-project-employee-map/create-project-employee-map.component";
import { AccountProfileComponent } from "../../account-profile/account-profile.component";
import { ChannelConfigurationComponent } from "../../channel-configuration/channel-configuration.component";
import { ChannelCredentialsComponent } from "../../channel-credentials/channel-credentials.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "company-details", component: CompanyDetailsComponent },
  { path: "project-details", component: ProjectDetailsComponent },
  {
    path: "project-details/create-project/:projectId",
    component: CreateProjectComponent
  },
  {
    path: "project-details/project-profile/:projectId",
    component: ProjectProfileComponent
  },

  { path: "account-details", component: AccountDetailsComponent },
  {
    path: "account-details/create-account/:accountId",
    component: CreateAccountComponent
  },
  {
    path: "account-details/account-profile/:accountId",
    component: AccountProfileComponent
  },

  { path: "client-details", component: ClientDetailsComponent },
  {
    path: "client-details/create-client/:clientId",
    component: CreateClientComponent
  },

  { path: "employee-details", component: EmployeeDetailsComponent },
  {
    path: "employee-details/create-employee/:employeeId",
    component: CreateEmployeeComponent
  },
  {
    path: "employee-details/employee-profile/:employeeId",
    component: EmployeeProfileComponent
  },
  {
    path: "employee-details/create-mapping/:employeeId",
    component: CreateProjectEmployeeMapComponent
  },

  { path: "project-account", component: ProjectAccountMappingComponent },
  {
    path: "project-account/create-mapping/:id/:isEdit",
    component: CerateProjectAccountMapComponent
  },
  {
    path: "project-client/create-mapping/:projectId/:accountId",
    component: CreateProjectClientMapComponent
  },
  {
    path: "channel-configuration",
    component: ChannelConfigurationComponent
  },
  {
    path: "channel-credentials",
    component: ChannelCredentialsComponent
  },
  // {
  //   path: "channel-credentials",
  //   component: ChannelCredentialsComponent
  // }
];
