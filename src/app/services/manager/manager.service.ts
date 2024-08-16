import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private url = 'http://localhost:8080/manager';

  constructor(private http: HttpClient) { }

  addManager(manager: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(manager);
    return this.http.post<any>(this.url,manager,httpOptions);
  }
}
