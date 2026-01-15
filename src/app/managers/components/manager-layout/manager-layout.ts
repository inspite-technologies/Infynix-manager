import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ManagerSidebarComponent 
    // ManagerHeaderComponent removed from here
  ],
  templateUrl: './manager-layout.html',
  styleUrls: ['./manager-layout.css']
})
export class ManagerLayoutComponent implements OnInit {
  isSidebarCollapsed: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSidebarToggle(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
  }

  onMenuItemClick(menuId: string): void {
    const routes: { [key: string]: string } = {
      'dashboard': '/manager/dashboard',
      'team': '/manager/team',
      'projects': '/manager/projects',
      'attendance': '/manager/attendance',
      'reports': '/manager/reports',
      'settings': '/manager/settings'
    };

    if (routes[menuId]) {
      this.router.navigate([routes[menuId]]);
    }
  }
}