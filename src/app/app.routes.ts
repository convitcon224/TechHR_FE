import { Routes } from '@angular/router';
import { AllEmployeeComponent } from './components/admin/main-content/employee/all-employee/all-employee.component';
import { TaskComponent } from './components/admin/main-content/task/all-task/task.component';
import { AddTaskComponent } from './components/admin/main-content/task/add-task/add-task.component';
import { AddAccountComponent } from './components/admin/main-content/employee/add-account/add-account.component';
import { LoginComponent } from './components/commons/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AssignTaskComponent } from './components/admin/main-content/task/assign-task/assign-task.component';


export const routes: Routes = [
    {
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: '', component: AllEmployeeComponent },
            { path: 'task', component: TaskComponent },
            { path: 'add-task', component: AddTaskComponent },
            { path: 'assign-task', component: AssignTaskComponent },
            { path: 'add-employee', component: AddAccountComponent }
        ],
        title: 'Admin'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
