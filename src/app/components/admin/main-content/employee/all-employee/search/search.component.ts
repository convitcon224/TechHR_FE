import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Department } from '../../../../../../models/department';
import { DepartmentService } from '../../../../../../services/department/department.service';
import { Major } from '../../../../../../models/major';
import { MajorService } from '../../../../../../services/major/major.service';
import { EmployeeService } from '../../../../../../services/employee/employee.service';

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  departmentID = "";
  departmentList: Department[] = [];
  departmentService: DepartmentService = inject(DepartmentService);

  majorID = "";
  majorList: Major[] = [];
  majorService: MajorService = inject(MajorService);

  employeeService: EmployeeService = inject(EmployeeService);

  constructor() {
    this.departmentService.getAllDepartments().subscribe((departmentList: Department[]) => {
      this.departmentList = departmentList;
    });

    this.majorService.getAllMajors().subscribe((majorList: Major[]) => {
      this.majorList = majorList;
    })
  }



  searchEmployee(){
    this.employeeService.searchEmployees(this.majorID, this.departmentID);
  }
}
