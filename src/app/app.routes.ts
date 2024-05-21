import { Routes } from '@angular/router';
import { AllEmployeeComponent } from './components/admin/main-content/employee/all-employee/all-employee.component';
import { TaskComponent } from './components/admin/main-content/task/all-task/task.component';
import { AddTaskComponent } from './components/admin/main-content/task/add-task/add-task.component';
import { AddAccountComponent } from './components/admin/main-content/employee/add-account/add-account.component';


export const routes: Routes = [
    {
        path: '',
        component: AllEmployeeComponent,
        title: 'Admin'
    },
    {
        path: 'task',
        component: TaskComponent,
        title: 'Admin'
    },
    {
        path: 'add-task',
        component: AddTaskComponent,
        title: 'Admin'
    },
    {
        path: 'add-employee',
        component: AddAccountComponent,
        title: 'Admin'
    }
];
