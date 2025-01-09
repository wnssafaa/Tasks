import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 
  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateTaskStatus(taskId: string, status: string): Observable<any> {
    const body = { status };  // Envoyer uniquement le statut mis à jour
    return this.http.patch(`${this.apiUrl}/${taskId}/status`, body);
  }

  // Mettre à jour la priorité d'une tâche
  updateTaskPriority(taskId: string, priority: string): Observable<any> {
    const body = { priority };  // Envoyer uniquement la priorité mise à jour
    return this.http.patch(`${this.apiUrl}/${taskId}/priority`, body);
  }
  deleteTasks(ids: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete-tasks`, { ids });
  }
  
}
