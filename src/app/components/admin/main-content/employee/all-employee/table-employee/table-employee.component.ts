import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../../../../../models/employee';
import { EmployeeService } from '../../../../../../services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailComponent } from '../../employee-detail/employee-detail.component';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-employee',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, EmployeeDetailComponent],
  templateUrl: './table-employee.component.html',
  styleUrl: './table-employee.component.scss'
})

export class TableEmployeeComponent implements AfterViewInit {
  employeeList: Employee[] = [];
  private employeeService: EmployeeService = inject(EmployeeService);

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'major', 'department'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.employeeList);
    this.refresh();
    
    this.employeeService.employeeList.subscribe(employees => {
      this.dataSource.data = employees;
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

  openEmployeeDetail(row: any): void {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      height: '90%',
      width: '80%',
      data: {id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            major: row.major,
            department: row.department},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh()
    });
  }

  refresh(): void {
    this.employeeService.getAllEmployees().then((employeeList: Employee[]) => {
      this.dataSource.data = employeeList;
    });
  }
}

