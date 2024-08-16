import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignment } from '../../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private url = 'http://localhost:8080/assignment';

  private assignmentListSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getAssignmentByTaskId(taskId: number): Observable<any> {
    return this.http.get<Assignment>(`${this.url}/task/${taskId}`);
  }

  createAssignment(assignment: Assignment): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Assignment>(this.url,assignment,httpOptions);
  }

  getAssignmentsFilter(params: any): void {
    this.http.get<any[]>(this.url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params
    }).subscribe((result) => {
      this.assignmentListSource.next(result);
    });;
  }

  getAssignmentList(): Observable<any> {
    return this.assignmentListSource.asObservable();
  }
}
