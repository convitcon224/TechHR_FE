import { Component } from '@angular/core';
import { DateRangePickerComponent } from '../../../../../commons/date-range-picker/date-range-picker.component';
import { TaskService } from '../../../../../../services/task/task.service';
import { TaskParam } from '../../../../../../models/taskParam';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-task',
  standalone: true,
  imports: [DateRangePickerComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  typeList: TaskParam[];
  difficultyList: TaskParam[];
  statusList: TaskParam[];
  typeFilter = "Type";
  difficultyFilter = "Difficulty";
  statusFilter = "Status";
  createStartDate: any;
  createEndDate: any;
  deadlineStartDate: any;
  deadlineEndDate: any;


  constructor(private taskService: TaskService
  ) {
    forkJoin(this.taskService.getAllTaskType(),
      this.taskService.getAllTaskDifficulty(),
      this.taskService.getAllTaskStatus())
      .subscribe(([call1, call2, call3]) => {
        this.typeList = call1;
        this.difficultyList = call2;
        this.statusList = call3;
      })
  }

  handleCreateStartDateChange(event: any) {
    this.createStartDate = event;
  }
  handleCreateEndDateChange(event: any) {
    this.createEndDate = event;
  }
  handleDeadlineStartDateChange(event: any) {
    this.deadlineStartDate = event;
  }
  handleDeadlineEndDateChange(event: any) {
    this.deadlineEndDate = event;
  }

  submitFilter() {
    let filterTask = {
      typeId: null,
      difficultyId: null,
      statusId: null,
      createTime: null,
      deadline: null
    }
    this.getFilterParams(filterTask);
    this.taskService.getTaskWithFilter(filterTask);
  }

  getFilterParams(filterTask: any) {
    if (this.typeFilter !== "Type") {
      filterTask["typeId"] = `:${this.typeFilter}`;
    }
    if (this.difficultyFilter !== "Difficulty") {
      filterTask["difficultyId"] = `:${this.difficultyFilter}`;
    }
    if (this.statusFilter !== "Status") {
      filterTask["statusId"] = `:${this.statusFilter}`;
    }
    if (this.createStartDate != null && this.createEndDate != null) {
      filterTask["createTime"] = [`>${this.createStartDate}`, `<${this.createEndDate}`];
    }
    if (this.deadlineStartDate != null && this.deadlineEndDate != null) {
      filterTask["deadline"] = [`>${this.deadlineStartDate}`, `<${this.deadlineEndDate}`];
    }
  }
}
