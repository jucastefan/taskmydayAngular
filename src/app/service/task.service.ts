import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${url}/api/v1/tasks`);
  }

  createTask(body: any) {
    return this.http.post(`${url}/api/v1/tasks`, body);
  }

  editTask(id: any, body: any) {
    return this.http.patch(`${url}/api/v1/tasks/${id}`, body);
  }

  deleteTask(id: any) {
    return this.http.delete(`${url}/api/v1/tasks/${id}`);
  }
}
