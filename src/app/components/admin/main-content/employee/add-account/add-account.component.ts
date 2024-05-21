import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Department } from '../../../../../models/department';
import { DepartmentService } from '../../../../../services/department/department.service';
import { Major } from '../../../../../models/major';
import { MajorService } from '../../../../../services/major/major.service';


@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  departmentList: Department[] = [];
  departmentService: DepartmentService = inject(DepartmentService);

  majorList: Major[] = [];
  majorService: MajorService = inject(MajorService);

  newEmployeeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required, Validators.maxLength(255)]),
    email: new FormControl(null,[Validators.required, Validators.maxLength(255), Validators.email]),
    phone: new FormControl(null,[Validators.required, Validators.maxLength(50), Validators.minLength(7), Validators.pattern("[- +()0-9]+")]),
    majorID: new FormControl(null),
    departmentID: new FormControl(null)
  });

  constructor() {
    this.departmentService.getAllDepartments().then((departmentList: Department[]) => {
      this.departmentList = departmentList;
    });

    this.majorService.getAllMajors().then((majorList: Major[]) => {
      this.majorList = majorList;
    });
  }
}
