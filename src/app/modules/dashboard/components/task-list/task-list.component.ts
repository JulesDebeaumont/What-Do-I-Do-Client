import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/routeAnimation';
// services
import { TaskService } from 'src/app/services/task.service';
// models
import { Task } from 'src/app/models/task.model';

// NO STORE STYLE

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [fadeInAnimation]
})
export class TaskListComponent implements OnInit {

  allUserTasks!: Task[];
  errorMessage!: string;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.taskService.getAllUserTasks()
      .subscribe((response) => {
        this.allUserTasks = response.tasks;
      }, (error) => {
        if (error.status === 0) {
          this.errorMessage = 'An internal error has occured';
        } else {
          this.errorMessage = `An error has occured: ${error.message}`;
        }
      });
  }

  filterAllTasks(deletedTask: Task): void {
    this.allUserTasks = this.allUserTasks.filter((task: Task) => (
      task !== deletedTask
    ))
  }
}
