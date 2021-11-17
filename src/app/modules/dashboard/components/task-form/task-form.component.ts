import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  taskId?: number;
  isEdit?: boolean;
  isLoading: boolean = false;
  errorMessage!: string;
  minDate: Date = new Date();
  taskForm: FormGroup = this.formBuilder.group({
    'id': new FormControl(''),
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'start': new FormControl(new Date, [
      Validators.required,
    ]),
    'isActivated': new FormControl('true', [
      Validators.required,
    ]),
    'isRepeated': new FormControl(''),
    'message': new FormControl('')
  });

  get name(): AbstractControl | null {
    return this.taskForm.get('name');
  }
  get start(): AbstractControl | null {
    return this.taskForm.get('start');
  }
  get isActivated(): AbstractControl | null {
    return this.taskForm.get('isActivated');
  }
  get repeatInterval(): AbstractControl | null {
    return this.taskForm.get('repeatInterval');
  }
  get message(): AbstractControl | null {
    return this.taskForm.get('message');
  }

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.taskId = Number(this.route.snapshot.paramMap.get('id'));
      this.isEdit = true;

      this.getTask(this.taskId);
    }
  }

  getTask(taskId: number): void {
    this.isLoading = true;
    this.taskService.getTask(taskId)
      .subscribe((response) => {
        this.taskForm.setValue({
          id: response.id,
          name: response.name,
          start: response.start,
          isActivated: response.isActivated,
          repeatInterval: response.repeatInterval,
          message: response.message
        })
      }, (error) => {
        console.log(error.message);
      }, () => {
        this.isLoading = false;
      })
  }

  saveTask(task: Task): void {
    this.isLoading = true;
    this.taskService.postTask(task)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/tasks');
      }, (error) => {
        console.log(error.message);
      }, () => {
        this.isLoading = false;
      })
  }

  patchTask(task: Task): void {
    this.isLoading = true;
    this.taskService.patchTask(task)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard/tasks');
      }, (error) => {
        console.log(error.message);
      }, () => {
        this.isLoading = false;
      })
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: any = this.taskForm.getRawValue();
      if (!taskData.repeatInterval) {
        taskData.repeatInterval = 0;
      }

      if (this.isEdit) {
        this.patchTask(taskData as Task);
      } else {
        this.saveTask(taskData as Task);
      }
    }
  }

}
