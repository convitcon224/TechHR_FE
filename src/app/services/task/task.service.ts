import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskParam } from '../../models/taskParam';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/task';

  private taskListSource: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) { }

  addTask(task: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.url,task,httpOptions);
  }

  getAllTaskDifficulty(): Observable<TaskParam[]> {
    return this.http.get<TaskParam[]>(`${this.url}/difficulty`);
  }

  getAllTaskType(): Observable<TaskParam[]> {
    return this.http.get<TaskParam[]>(`${this.url}/type`);
  }

  getAllTaskStatus(): Observable<TaskParam[]> {
    return this.http.get<TaskParam[]>(`${this.url}/status`);
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}`);
  }

  updateTask(task: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(this.url,task,httpOptions);
  }

  getTaskWithFilter(params: any) {
    this.http.get<Task[]>(`${this.url}/filter`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params
    }).subscribe((result) => {
      this.taskListSource.next(result);
    });
  }

  getTaskList(): Observable<Task[]> {
    return this.taskListSource.asObservable();
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
