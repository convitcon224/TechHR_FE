import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../../../../models/employee';
import { MajorService } from '../../../../../services/major/major.service';
import { DepartmentService } from '../../../../../services/department/department.service';
import { Department } from '../../../../../models/department';
import { Major } from '../../../../../models/major';
import { EmployeeService } from '../../../../../services/employee/employee.service';


@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {
  departmentID = "";
  departmentList: Department[] = [];
  departmentService: DepartmentService = inject(DepartmentService);

  majorID = "";
  majorList: Major[] = [];
  majorService: MajorService = inject(MajorService);

  employeeService: EmployeeService = inject(EmployeeService);

  employeeUpdateForm = new FormGroup({
    id: new FormControl(this.data.id),
    name: new FormControl(this.data.name,[Validators.required, Validators.maxLength(255)]),
    email: new FormControl(this.data.email,[Validators.required, Validators.maxLength(255), Validators.email]),
    phone: new FormControl(this.data.phone,[Validators.required, Validators.maxLength(50), Validators.minLength(7), Validators.pattern("[- +()0-9]+")]),
    majorID: new FormControl(this.majorID),
    departmentID: new FormControl(this.departmentID)
  });


  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) 
  {
    this.departmentService.getAllDepartments().subscribe((departmentList: Department[]) => {
      this.departmentList = departmentList;
      this.departmentID = this.departmentService.getIdByName(this.departmentList, data.department!);
      this.employeeUpdateForm.patchValue({departmentID: this.departmentID});
    });

    this.majorService.getAllMajors().subscribe((majorList: Major[]) => {
      this.majorList = majorList;
      this.majorID = this.majorService.getIdByValue(this.majorList, data.major!);
      this.employeeUpdateForm.patchValue({majorID: this.majorID});
    });
  }

  onSaveClick(): void {
    // Validate
    this.validateSaveForm();

    // Save
    this.employeeService.updateEmployee(this.employeeUpdateForm.getRawValue()).subscribe((result: any) => {
      if (result.id){
        this.createAlertDiv('Success!','success');
      } else {
        this.createAlertDiv(result?.message,'danger');
      }
    });
  }

  onDeleteClick(): void {
    this.employeeService.deleteEmployee(this.data.id!).subscribe((result: any) => {
      if (result.id){
        this.createAlertDiv('Success!','success');
      } else {
        this.createAlertDiv(result?.message,'danger');
      }
    });
  }

  createAlertDiv(message: string, type: string): void {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    let wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('');
    alertPlaceholder?.replaceChildren(wrapper)
  }

  validateSaveForm(): void {
    if (this.employeeUpdateForm.controls.name.hasError('required')) {
      this.createAlertDiv('Name field is required!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.name.hasError('maxlength')) {
      this.createAlertDiv('Name must not exceed 255 characters!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.email.hasError('required')) {
      this.createAlertDiv('Email field is required!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.email.hasError('maxlength')) {
      this.createAlertDiv('Email must not exceed 255 characters!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.email.hasError('email')) {
      this.createAlertDiv('Invalid email!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.phone.hasError('required')) {
      this.createAlertDiv('Phone field is required!','danger');
      return;
    } else if (this.employeeUpdateForm.controls.phone.hasError('maxlength') ||
              this.employeeUpdateForm.controls.phone.hasError('minlength') ||
              this.employeeUpdateForm.controls.phone.hasError('pattern')) {
      this.createAlertDiv('Invalid phone!','danger');
      return;
    }
  }
  
}

