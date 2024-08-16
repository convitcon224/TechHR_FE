import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MY_FORMATS } from '../../../../commons/date-range-picker/date-range-picker.component';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { TaskService } from '../../../../../services/task/task.service';
import { Task } from '../../../../../models/task';
import { TaskParam } from '../../../../../models/taskParam';
import { CalendarModule } from 'primeng/calendar';
import { TimeUTCService } from '../../../../../services/timeUTC/time-utc.service';
import { SearchComponent } from "./search/search.component";
import { TableAssignmentComponent } from "./table-assignment/table-assignment.component";

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CalendarModule,
    SearchComponent,
    TableAssignmentComponent],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.scss'
})
export class AssignTaskComponent {

  constructor(private taskService: TaskService,
    private timeUTCService: TimeUTCService
  ) {

  }

  assignTaskForm = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.maxLength(255)]),
    difficulty: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    deadline: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  });
}
