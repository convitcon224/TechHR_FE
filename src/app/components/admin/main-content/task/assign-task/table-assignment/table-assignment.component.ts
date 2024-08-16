import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Task } from '../../../../../../models/task';
import { TaskDetailComponent } from '../../task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../../../../services/task/task.service';
import { DatePipe } from '@angular/common';
import { TimeUTCService } from '../../../../../../services/timeUTC/time-utc.service';
import { AssignmentService } from '../../../../../../services/assignment/assignment.service';

@Component({
  selector: 'app-table-assignment',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, TaskDetailComponent],
  providers: [DatePipe],
  templateUrl: './table-assignment.component.html',
  styleUrl: './table-assignment.component.scss'
})
export class TableAssignmentComponent {
  displayedColumns: string[] = ['Task', 'Assigned To', 'Status', 'Start Time', 'Due Time', 'Description'];
  dataSource: MatTableDataSource<any>;
  assignmentList: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private assignmentService: AssignmentService,
    private datePipe: DatePipe,
    private timeUTCService: TimeUTCService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.assignmentList);

    this.assignmentService.getAssignmentsFilter(null);

    this.assignmentService.getAssignmentList().subscribe(assignments => {
      this.dataSource.data = assignments;
    });
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

  // openTaskDetail(row: any): void {
  //   const dialogRef = this.dialog.open(TaskDetailComponent, {
  //     height: '90%',
  //     width: '80%',
  //     data: {id: row.id,
  //           name: row.name,
  //           description: row.description, 
  //           difficulty: row.difficulty,
  //           difficultyId: row.difficultyId,
  //           createTime: row.createTime,
  //           deadline: row.deadline,
  //           status: row.status,
  //           statusId: row.statusId,
  //           type: row.type,
  //           typeId: row.typeId,
  //           document: ""},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.refresh();
  //   });
  // }

  getFormattedDate(date: Date) {
    return this.datePipe.transform(date, "dd/MM/yyyy HH:mm:ss");
  }

  refresh(): void {
    // this.taskService.getAllTask().subscribe((taskList: Task[]) => {
    //   this.dataSource.data = taskList;
    // });
  }
}
