import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8080/employee';

  private employeeListSource: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.employeeListSource.asObservable();
  }

  
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}s`);
  }


  searchEmployees(majorID: string, departmentID: string) {
    const params = new URLSearchParams();
    params.set('majorID',majorID);
    params.set('departmentID',departmentID);

    this.http.get<Employee[]>(`${this.url}s/search?${params}`).subscribe((searchData)=>{
      this.employeeListSource.next(searchData);
    });
  }

  searchEmployeesNotSub(majorID: string, departmentID: string): Observable<Employee[]> {
    const params = new URLSearchParams();
    params.set('majorID',majorID);
    params.set('departmentID',departmentID);

    return this.http.get<Employee[]>(`${this.url}s/search?${params}`);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  updateEmployee(employee: any): Observable<any> {
    const url = `${this.url}/${employee.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(url, employee, httpOptions);
  }

  addEmployee(employee: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.url,employee,httpOptions);
  }
}
