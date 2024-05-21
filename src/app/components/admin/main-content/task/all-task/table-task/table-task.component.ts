import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Task } from '../../../../../../models/task';
import { TaskDetailComponent } from '../../task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-table-task',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, TaskDetailComponent],
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss'
})

export class TableTaskComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'difficulty', 'createTime', 'deadline', 'status', 'type'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Create 100 tasks
    const tasks = Array();
    for (var i=1;i<=100;i++){
      tasks.push(createNewTask(i.toString()))
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(tasks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTaskDetail(row: any): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      height: '90%',
      width: '80%',
      data: {id: row.id,
            name: row.name,
            description: "everyone else. I will no longer say the F word throughout the rest of this entire text. Of course, by the F word, I mean the one that I just used six times, not the one that you're probably thinking of which I have not used throughout this entire text. I just realised that next year will be 2020. That's crazy! It just feels so futuristic! It's also crazy that the 2010s decade is almost over. That decade brought be a lot of memories. In fact, it brought be almost all of my memories. It'll be sad to see it go. I'm gonna work on a series of video lessons for Toki Pona. I'll expain what Toki Pona is after I come back. Bye! I'm back now, and I decided not to do it on Toki Pona, since many other people have done Toki Pona video lessons already. I decided to do it on Viesa, my English code. Now, I shall explain what Toki Pona is. Toki Pona is a minimalist constructed language that has only ~120 words! That means you can learn it very quickly. I reccomend you learn it! It's pretty fun", 
            difficulty: row.difficulty,
            createTime: row.createTime,
            deadline: row.deadline,
            status: row.status,
            type: row.type,
            document: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


/** Builds and returns a new Task. */
function createNewTask(id: string): Task {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id,
    name: name,
    difficulty: Math.round(Math.random() * 100).toString(),
    createTime: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    deadline: "test",
    status: "Done",
    type: "Type",
  };
}

