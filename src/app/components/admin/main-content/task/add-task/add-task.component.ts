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

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CalendarModule
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  currentDateAndTime = new Date();
  difficultyList: TaskParam[];
  typeList: TaskParam[];

  constructor(private taskService: TaskService,
    private timeUTCService: TimeUTCService
  ) {
    this.taskService.getAllTaskDifficulty().subscribe((difficultyList: TaskParam[]) => {
      this.difficultyList = difficultyList;
    });

    this.taskService.getAllTaskType().subscribe((typeList: TaskParam[]) => {
      this.typeList = typeList;
    });
  }
  
  newTaskForm = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.maxLength(255)]),
    difficulty: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    deadline: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
  });

  addTask() {
    if (!this.isAddFormValid()) {
      return;
    }
    let newTask = 
      {
        name: this.newTaskForm.value.name!,
        description: this.newTaskForm.value.description!,
        difficultyId: this.newTaskForm.value.difficulty!,
        deadline: new Date(this.newTaskForm.value.deadline!),
        typeId: this.newTaskForm.value.type!,
        documentId: this.newTaskForm.value.document!,
      }
    this.timeUTCService.convertTimeToUTC(newTask.deadline);

    this.taskService.addTask(newTask).subscribe(
      (result) => {
        this.createAlertDiv('Success!','success');
      },
      (error)=>{
        this.createAlertDiv(error.error.message,'danger');
      }
    );
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

  isAddFormValid(): boolean {
    if (this.newTaskForm.controls.name.hasError('required')) {
      this.createAlertDiv('Name field is required!','danger');
      return false;
    } else if (this.newTaskForm.controls.name.hasError('maxlength')) {
      this.createAlertDiv('Name must not exceed 255 characters!','danger');
      return false;
    } else if (this.newTaskForm.controls.difficulty.hasError('required')) {
      this.createAlertDiv('Difficulty field is required!','danger');
      return false;
    } else if (this.newTaskForm.controls.type.hasError('required')) {
      this.createAlertDiv('Type field is required!','danger');
      return false;
    } else if (this.newTaskForm.controls.deadline.hasError('required')) {
      this.createAlertDiv('Deadline field is required!','danger');
      return false;
    }
    return true;
  }

}
