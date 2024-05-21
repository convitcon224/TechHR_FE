import { Injectable } from '@angular/core';
import { Department } from '../../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'http://localhost:8080/departments';

  constructor() { }

  async getAllDepartments(): Promise<Department[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  getIdByName(objectList: Department[], name: string): string {
    return objectList.find(x => x.name === name)?.id ?? '';
  }
}
