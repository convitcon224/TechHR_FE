import { Injectable } from '@angular/core';
import { Department } from '../../models/department';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'http://localhost:8080/departments';

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  getIdByName(objectList: Department[], name: string): string {
    return objectList.find(x => x.name === name)?.id ?? '';
  }
}
