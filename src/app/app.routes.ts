import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ManagerLayoutComponent } from './managers/components/manager-layout/manager-layout';
import { ManagerDashboardComponent } from './managers/components/manager-dashboard/manager-dashboard';
import { ProjectsComponent } from './managers/components/projects/projects';
import { TeamOverviewComponent } from './managers/components/team-task-overview/team-task-overview';
import { ManagerRequestServiceComponent } from './managers/components/manager-request-service.component/manager-request-service.component';
// UPDATED PATH: Points to the new location in the components folder
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manager',
    component: ManagerLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: ManagerDashboardComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'team',
        component: TeamOverviewComponent
      },
      {
        path: 'request-service',
        component: ManagerRequestServiceComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];