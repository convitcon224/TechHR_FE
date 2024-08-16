import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Department } from '../../../../../models/department';
import { DepartmentService } from '../../../../../services/department/department.service';
import { Major } from '../../../../../models/major';
import { MajorService } from '../../../../../services/major/major.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../../../../../services/employee/employee.service';
import { Employee } from '../../../../../models/employee';
import { Manager } from '../../../../../models/manager';
import { ManagerService } from '../../../../../services/manager/manager.service';


@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, FormsModule, MatFormFieldModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  departmentList: Department[] = [];

  majorList: Major[] = [];

  newEmployeeForm = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.maxLength(255)]),
    email: new FormControl(null,[Validators.required, Validators.maxLength(255), Validators.email]),
    phone: new FormControl(null,[Validators.required, Validators.maxLength(50), Validators.minLength(7), Validators.pattern("[- +()0-9]+")]),
    password: new FormControl(null,[Validators.required, Validators.maxLength(50), Validators.minLength(7)]),
    passwordConfirm: new FormControl(null),
    majorID: new FormControl(1),
    departmentID: new FormControl(1),
    role: new FormControl("User"),
  });

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private majorService: MajorService,
    private managerService: ManagerService
  ) {
    this.departmentService.getAllDepartments().subscribe((departmentList: Department[]) => {
      this.departmentList = departmentList;
    });

    this.majorService.getAllMajors().subscribe((majorList: Major[]) => {
      this.majorList = majorList;
    });
  }

  onAddClick(){
    if (!this.validateSaveForm()){
      return;
    }

    if (this.newEmployeeForm.value.role=="User") {
      let newUser: Employee = 
      {
        name: this.newEmployeeForm.value.name!,
        email: this.newEmployeeForm.value.email!,
        phone: this.newEmployeeForm.value.phone!,
        password: this.newEmployeeForm.value.password!,
        majorID: this.newEmployeeForm.value.majorID?.toString()!,
        departmentID: this.newEmployeeForm.value.departmentID?.toString()!
      }
      this.employeeService.addEmployee(newUser).subscribe((result)=>{
          this.createAlertDiv('Success!','success');
        },
        (error)=>{
          this.createAlertDiv(error.error.message,'danger');
        }
      );
    } else if (this.newEmployeeForm.value.role=="Admin") {
      let newManager: Manager = {
        name: this.newEmployeeForm.value.name!,
        email: this.newEmployeeForm.value.email!,
        phone: this.newEmployeeForm.value.phone!,
        password: this.newEmployeeForm.value.password!
      }
      console.log(newManager);
      this.managerService.addManager(newManager).subscribe((result)=>{
          this.createAlertDiv('Success!','success');
        },
        (error)=>{
          this.createAlertDiv(error.error.message,'danger');
        }
      );
    }
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

  validateSaveForm(): boolean {
    if (this.newEmployeeForm.controls.name.hasError('required')) {
      this.createAlertDiv('Name field is required!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.name.hasError('maxlength')) {
      this.createAlertDiv('Name must not exceed 255 characters!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.email.hasError('required')) {
      this.createAlertDiv('Email field is required!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.email.hasError('maxlength')) {
      this.createAlertDiv('Email must not exceed 255 characters!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.email.hasError('email')) {
      this.createAlertDiv('Invalid email!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.phone.hasError('required')) {
      this.createAlertDiv('Phone field is required!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.phone.hasError('maxlength') ||
              this.newEmployeeForm.controls.phone.hasError('minlength') ||
              this.newEmployeeForm.controls.phone.hasError('pattern')) {
      this.createAlertDiv('Invalid phone!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.password.hasError('required')) {
      this.createAlertDiv('Password field is required!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.password.hasError('maxlength')) {
      this.createAlertDiv('Password must not exceed 50 characters!','danger');
      return false;
    } else if (this.newEmployeeForm.controls.password.hasError('minlength')) {
      this.createAlertDiv('Password must have at least 7 characters!','danger');
      return false;
    } else if (this.newEmployeeForm.value.password != this.newEmployeeForm.value.passwordConfirm) {
      this.createAlertDiv('Passwords are not identical','danger');
      return false;
    }
    return true;
  }

}
