import { Component } from '@angular/core';
import {SearchComponent} from './search/search.component';
import { TableEmployeeComponent } from './table-employee/table-employee.component';

@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [SearchComponent, TableEmployeeComponent],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.scss'
})
export class AllEmployeeComponent {

}
