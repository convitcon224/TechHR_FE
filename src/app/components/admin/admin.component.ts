import { Component } from '@angular/core';
import {LeftBarComponent} from './left-bar/left-bar.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {AllEmployeeComponent} from './main-content/employee/all-employee/all-employee.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, LeftBarComponent, TopNavComponent, AllEmployeeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
