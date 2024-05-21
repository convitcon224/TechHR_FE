import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { TableTaskComponent } from './table-task/table-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [SearchComponent, TableTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

}
