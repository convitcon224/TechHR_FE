import { Injectable } from '@angular/core';
import { Major } from '../../models/major';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  url = 'http://localhost:8080/majors'

  constructor(private http: HttpClient) { }

  getAllMajors(): Observable<Major[]>{
    return this.http.get<Major[]>(this.url);
  }

  getIdByValue(objectList: Major[], value: string): string {
    return objectList.find(x => x.value === value)?.id ?? '';
  }
}

