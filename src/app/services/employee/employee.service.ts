import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8080/employee';

  private employeeListSource: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  employeeList: Observable<Employee[]> = this.employeeListSource.asObservable();

  constructor() { }

  async getAllEmployees(): Promise<Employee[]> {
    const data = await fetch(`${this.url}s`);
    return (await data.json()) ?? [];
  }


  async searchEmployees(majorID: string, departmentID: string) {
    const params = new URLSearchParams();
    params.set('majorID',majorID);
    params.set('departmentID',departmentID);

    const data = await fetch(`${this.url}s/search?${params}`);
    this.employeeListSource.next((await data.json()) ?? []);
  }

  async deleteEmployee(id: string): Promise<any> {
    const data = await fetch(`${this.url}/${id}`, { method: 'DELETE' });
    return (await data.json()) ?? [];
  }

  async updateEmployee(employee: any): Promise<any> {
    const data = await fetch(`${this.url}/${employee.id}`,
                            { method: 'PUT',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify(employee) });
    return (await data.json()) ?? [];
  }
}
