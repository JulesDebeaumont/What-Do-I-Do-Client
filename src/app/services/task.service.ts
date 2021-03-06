// core
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// model
import { Task } from '../models/task.model';
// services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiTasksUrl: string = '/tasks';
  private httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private httpOptionsPatch: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    })
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  /**
   * GET - Get all tasks by user
   */
  getAllUserTasks(): Observable<any> {
    return this.http.get<Task[]>(environment.apiUrl + `/users/${this.auth.getUserId()}${this.apiTasksUrl}`, this.httpOptions);
  }


  /**
  * GET - Get task
  */
  getTask(taskId: number): Observable<any> {
    return this.http.get<Task>(environment.apiUrl + `${this.apiTasksUrl}/${taskId}`, this.httpOptions);
  }


  /**
   * POST - Post task
   */
  postTask(taskData: Task): Observable<any> {
    return this.http.post<Task>(environment.apiUrl + `${this.apiTasksUrl}`, taskData, this.httpOptions);
  }


  /**
  * PATCH - Patch task
  */
  patchTask(taskData: Task): Observable<any> {
    return this.http.patch<Task>(environment.apiUrl + `${this.apiTasksUrl}/${taskData.id}`, taskData, this.httpOptionsPatch);
  }


  /**
  * DELETE - Delete task
  */
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<Task>(environment.apiUrl + `${this.apiTasksUrl}/${taskId}`, this.httpOptions);
  }
}
