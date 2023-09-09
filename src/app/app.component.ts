import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from './service/task.service';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  toDoForm: FormGroup;
  tasks: object[];
  taskValue: any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
    this.createForm();
  }

  get taskstodo() {
    return this.toDoForm.get('tasks') as FormArray;
  }

  getTasks() {
    this.taskService
      .getTasks()
      .pipe(
        tap((res: any) => {
          this.tasks = res.data.tasks;
          this.prepopulate(this.tasks);
        })
      )
      .subscribe();
  }

  createTask(event?: any) {
    let task = this.toDoForm.controls['task'].value;

    const body = {
      task,
    };

    if (task) {
      this.taskService
        .createTask(body)
        .pipe(
          finalize(() => {
            this.addFieldTask(event.value);
          })
        )
        .subscribe();
    }
  }

  deleteTask(index: any) {
    let taskID = this.tasks[index]['_id'];
    this.taskstodo.removeAt(index);
    this.taskService.deleteTask(taskID).subscribe();
  }

  editTask(index: any, value: any) {
    let taskID = this.tasks[index]['_id'];
    const body = {
      task: value,
    };
    this.taskService.editTask(taskID, body).subscribe();
  }

  prepopulate(data: any) {
    data.forEach((task: any) => {
      const prepopulatedTasks = new FormControl(task.task);
      this.taskstodo.push(prepopulatedTasks);
    });
  }

  createForm() {
    this.toDoForm = new FormGroup({
      task: new FormControl(''),
      tasks: new FormArray([]),
    });
  }

  fieldTask(value: any) {
    return new FormControl(`${value}`);
  }

  addFieldTask(value: any) {
    this.taskstodo.push(this.fieldTask(value));
  }

  resetToDoList() {
    this.taskstodo.clear();
  }
}
