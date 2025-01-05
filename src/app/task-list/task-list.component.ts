import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MatTableModule,MatButtonModule,RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent  implements OnInit{
  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'priority',
    'due_date',
    'actions'
  ];
  tasks: any[] = [];
  errorMessage: string = '';

  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des tâches.';
        console.error(err);
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression de la tâche.';
          console.error(err);
        }
      });
    }
  }
  
  editTask(taskId: number): void {
    this.router.navigate(['/first', taskId]);
  }
}
