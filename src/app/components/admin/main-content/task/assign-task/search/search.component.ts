import { Component } from '@angular/core';
import { DateRangePickerComponent } from '../../../../../commons/date-range-picker/date-range-picker.component';
import { TaskService } from '../../../../../../services/task/task.service';
import { TaskParam } from '../../../../../../models/taskParam';
import { filter, forkJoin } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FieldsetModule } from 'primeng/fieldset';
import { DepartmentService } from '../../../../../../services/department/department.service';
import { MajorService } from '../../../../../../services/major/major.service';
import { Department } from '../../../../../../models/department';
import { Major } from '../../../../../../models/major';
import { AssignmentService } from '../../../../../../services/assignment/assignment.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DateRangePickerComponent,
          FormsModule,
          MultiSelectModule,
          FieldsetModule,
          ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  taskTypeList: TaskParam[];
  taskStatusList: TaskParam[];
  taskDifficultyList: TaskParam[];
  departmentList: Department[];
  majorList: Major[];
  startTime1: any;
  startTime2: any;
  dueTime1: any;
  dueTime2: any;


  filterAssignmentForm = new FormGroup({
    taskType: new FormControl(null),
    taskStatus: new FormControl(null),
    taskDifficulty: new FormControl(null),
    department: new FormControl(null),
    major: new FormControl(null)
  });

  constructor(
    private taskService: TaskService,
    private departmentService: DepartmentService,
    private majorService: MajorService,
    private assignmentService: AssignmentService
  ) {

    forkJoin(this.taskService.getAllTaskType(),
      this.taskService.getAllTaskStatus(),
      this.taskService.getAllTaskDifficulty(),
      this.departmentService.getAllDepartments(),
      this.majorService.getAllMajors()
    ).subscribe(([call1, call2, call3, call4, call5]) => {
      this.taskTypeList = call1;
      this.taskStatusList = call2;
      this.taskDifficultyList = call3;
      this.departmentList = call4;
      this.majorList = call5;
    });

  }

  handleStartTime1Change(event: any) {
    this.startTime1 = event;
  }
  handleStartTime2Change(event: any) {
    this.startTime2 = event;
  }
  handleDueTime1Change(event: any) {
    this.dueTime1 = event;
  }
  handleDueTime2Change(event: any) {
    this.dueTime2 = event;
  }

  submitFilter() {
    // console.log(this.startTime1,this.startTime2,this.dueTime1,this.dueTime2);
    let filterAssignment = {
      taskType: this.filterAssignmentForm.get("taskType")?.value,
      taskStatus: this.filterAssignmentForm.get("taskStatus")?.value,
      taskDifficulty: this.filterAssignmentForm.get("taskDifficulty")?.value,
      department: this.filterAssignmentForm.get("department")?.value,
      major: this.filterAssignmentForm.get("major")?.value,
      startTime: null,
      dueTime: null
    }
    this.getFilterParams(filterAssignment);
    this.assignmentService.getAssignmentsFilter(filterAssignment);
  }

  getFilterParams(filterAssignment: any) {
    filterAssignment["taskType"] = this.addPrefixToParam(filterAssignment["taskType"]);
    filterAssignment["taskStatus"] = this.addPrefixToParam(filterAssignment["taskStatus"]);
    filterAssignment["taskDifficulty"] = this.addPrefixToParam(filterAssignment["taskDifficulty"]);
    filterAssignment["department"] = this.addPrefixToParam(filterAssignment["department"]);
    filterAssignment["major"] = this.addPrefixToParam(filterAssignment["major"]);
    if (this.startTime1 != null && this.startTime2 != null) {
      filterAssignment["startTime"] = [`>${this.startTime1}`, `<${this.startTime2}`];
    }
    if (this.dueTime1 != null && this.dueTime2 != null) {
      filterAssignment["dueTime"] = [`>${this.dueTime1}`, `<${this.dueTime2}`];
    }
  }

  addPrefixToParam(param: any) {
    if (param && param.length > 0) {
      // return param.map((item: any) => ",".concat(item.toString()));
      return ",".concat(param.toString());
    }
    return null;
  }
}
