import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/company-details', title: 'Company Details',  icon:'person', class: '' },
    { path: '/project-details', title: 'Project Details',  icon:'person', class: '' },
    { path: '/account-details', title: 'Account Details',  icon:'person', class: '' },
    { path: '/client-details', title: 'Contact Details',  icon:'person', class: '' },
    { path: '/employee-details', title: 'Employee Details',  icon:'person', class: '' },
    { path: '/channel-configuration', title: 'Channel Configuration',  icon:'person', class: '' },
    { path: '/channel-credentials', title: 'Channel Credentials',  icon:'person', class: '' },

    
    // { path: '/project-account', title: 'Project Account',  icon:'person', class: '' },

    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
