import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Task } from '../../../../../models/task';
import { TaskService } from '../../../../../services/task/task.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { TaskParam } from '../../../../../models/taskParam';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../../commons/date-range-picker/date-range-picker.component';
import { CalendarModule } from 'primeng/calendar';
import { TimeUTCService } from '../../../../../services/timeUTC/time-utc.service';
import { EmployeeService } from '../../../../../services/employee/employee.service';
import { Employee } from '../../../../../models/employee';
import { AssignmentService } from '../../../../../services/assignment/assignment.service';
import { Assignment } from '../../../../../models/assignment';
import { DatePipe } from '@angular/common';
import { DepartmentService } from '../../../../../services/department/department.service';
import { MajorService } from '../../../../../services/major/major.service';
import { Major } from '../../../../../models/major';
import { Department } from '../../../../../models/department';
import { TechHRConstant } from '../../../../../util/techhr.constant';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatDatepickerModule,
    CalendarModule],
  providers: [provideMomentDateAdapter(MY_FORMATS), DatePipe],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  typeList: TaskParam[];
  difficultyList: TaskParam[];
  statusList: TaskParam[];
  employeeList: Employee[];
  assignmentDetail: Assignment;
  departmentList: Department[];
  majorList: Major[];

  readonly UPDATE_ALERT_DIV_ID = "liveAlertPlaceholder";
  readonly ASSIGN_ALERT_DIV_ID = "liveAlertPlaceholderAssign";

  editTaskForm = new FormGroup({
    id: new FormControl({value: this.data.id, disabled: true}, [Validators.required]),
    name: new FormControl(this.data.name,[Validators.required, Validators.maxLength(255)]),
    difficultyId: new FormControl(this.data.difficultyId,[Validators.required]),
    statusId: new FormControl({value: this.data.statusId, disabled: true},[Validators.required]),
    typeId: new FormControl(this.data.typeId,[Validators.required]),
    documentId: new FormControl(''),
    deadline: new FormControl(new Date(this.data.deadline),[Validators.required]),
    createTime: new FormControl({value: new Date(this.data.createTime), disabled: true},[Validators.required]),
    description: new FormControl(this.data.description,[Validators.required]),
  });

  assignTaskForm = new FormGroup({
    departmentId: new FormControl(""),
    majorId: new FormControl(""),
    employeeId: new FormControl("Employee", [Validators.required]),
    startTime: new FormControl(new Date(),[Validators.required, Validators.maxLength(255)]),
    deadline: new FormControl(new Date(),[Validators.required]),
  });

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private assignmentService: AssignmentService,
    private departmentService: DepartmentService,
    private majorService: MajorService,
    private timeUTCService: TimeUTCService
  ) {
    forkJoin(this.taskService.getAllTaskType(),
      this.taskService.getAllTaskDifficulty(),
      this.taskService.getAllTaskStatus(),
      this.employeeService.getAllEmployees(),
      this.departmentService.getAllDepartments(),
      this.majorService.getAllMajors(),
      this.assignmentService.getAssignmentByTaskId(this.data.id).pipe(catchError(error => {
        return of(null);
        })
      )
    )
      .subscribe(([call1, call2, call3, call4, call5, call6, call7]) => {
        this.typeList = call1;
        this.difficultyList = call2;
        this.statusList = call3;
        this.employeeList = call4;
        this.departmentList = call5;
        this.majorList = call6;
        this.assignmentDetail = call7;
        this.initAssignmentForm();
        console.log(this.departmentList);
        console.log(this.majorList);
      });

      console.log(data);
  }

  initAssignmentForm() {
    if (this.editTaskForm.get("statusId")?.value != 20) {
      this.assignTaskForm.get("departmentId")?.disable();
      this.assignTaskForm.get("majorId")?.disable();
      this.assignTaskForm.get("employeeId")?.disable();
      this.assignTaskForm.get("startTime")?.disable();
      this.assignTaskForm.get("deadline")?.disable();
      this.assignTaskForm.patchValue({
        employeeId: this.assignmentDetail.employeeId?.toString(),
        startTime: new Date(Date.parse(this.assignmentDetail.startTime!.toString())),
        deadline: new Date(Date.parse(this.assignmentDetail.dueTime!.toString()))
      });
    } else {
      this.assignTaskForm.patchValue({
        startTime: null,
        deadline: null
      });
    }
  }

  onDeleteClick(): void {
    this.taskService.deleteTask(this.editTaskForm.get("id")?.value).subscribe((result) => {
      this.createAlertDiv('Delete success!','success', this.UPDATE_ALERT_DIV_ID);
    },
    (error) => {
      if (error.status === 400) {
        this.createAlertDiv(error.error.message,'danger', this.UPDATE_ALERT_DIV_ID);
      }
    });
  }

  onDiscardClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.updateTask(this.editTaskForm.getRawValue());
    this.assignTask(this.assignTaskForm.getRawValue());
  }

  updateTask(result: any) {
    let taskUpdate = 
      {
        id: result.id,
        name: result.name,
        description: result.description,
        difficultyId: result.difficultyId,
        deadline: this.timeUTCService.convertTimeToUTC(new Date(result.deadline)),
        createTime: this.timeUTCService.convertTimeToUTC(new Date(result.createTime)),
        typeId: result.typeId,
        statusId: result.statusId,
        documentId: result.documentId,
      }
    this.taskService.updateTask(taskUpdate).subscribe((result) => {
      this.createAlertDiv('Update task successfully!','success', this.UPDATE_ALERT_DIV_ID);
    },
    (error) => {
      console.log(error);
      this.createAlertDiv(error.error.message,'danger', this.ASSIGN_ALERT_DIV_ID);
    });
  }

  assignTask(assignResult: any) {
    let assignmentNew = 
      {
        employeeId: assignResult.employeeId,
        taskId: this.editTaskForm.get("id")!.value,
        startTime: assignResult.startTime,
        dueTime: assignResult.deadline,
        managerId: TechHRConstant.MANAGER_ID
      }
    this.timeUTCService.convertTimeToUTC(assignmentNew.startTime);
    this.timeUTCService.convertTimeToUTC(assignmentNew.dueTime);
    if (this.editTaskForm.get("statusId")?.value == 20 &&
    this.assignTaskForm.get("employeeId")!.value !== "Employee") {
      this.assignmentService.createAssignment(assignmentNew).subscribe((result) => {
        this.createAlertDiv('Assign task successfully!','success', this.ASSIGN_ALERT_DIV_ID);
      },
      (error) => {
        this.createAlertDiv(error.error.message,'danger', this.ASSIGN_ALERT_DIV_ID);
      });
    }
  }

  createAlertDiv(message: string, type: string, alertId: string): void {
    let alertPlaceholder = document.getElementById(alertId);

    let wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('');
    alertPlaceholder?.replaceChildren(wrapper)
  }
  
  isUpdateFormValid(): boolean {
    if (this.editTaskForm.controls.id.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.name.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.name.hasError('maxlength')) {
      return false;
    } else if (this.editTaskForm.controls.statusId.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.difficultyId.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.typeId.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.deadline.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.createTime.hasError('required')) {
      return false;
    } else if (this.editTaskForm.controls.description.hasError('required')) {
      return false;
    }
    return true;
  }

  isAssignFormValid(): boolean {
    if (this.assignTaskForm.get("employeeId") != null &&
    this.assignTaskForm.get("employeeId")!.value === "Employee") {
      return true;
    }
    if (this.assignTaskForm.controls.employeeId.hasError('required')) {
      return false;
    } else if (this.assignTaskForm.controls.startTime.hasError('required')) {
      return false;
    } else if (this.assignTaskForm.controls.deadline.hasError('required')) {
      return false;
    }
    return true;
  }

  getFormattedDate(date: Date) {
    return this.datePipe.transform(date, "dd/MM/yyyy HH:mm:ss");
  }
  
  fetchEmployeeList() {
    this.employeeService.searchEmployeesNotSub((this.assignTaskForm.get("majorId")!.value as string), (this.assignTaskForm.get("departmentId")!.value as string))
    .subscribe((result) => {
      this.employeeList = result;
      this.assignTaskForm.get("employeeId")?.patchValue("Employee");
    });
  }
}
