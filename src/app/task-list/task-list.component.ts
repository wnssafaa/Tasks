import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { NgModule } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-task-list',
  imports: [CommonModule,MatFormFieldModule,MatIcon,MatSelectModule, MatTableModule,MatButtonModule,RouterModule,MatPaginator, MatPaginatorModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id','title', 'status', 'priority', 'due_date' , 'assigned_to', 'tags', 'actions'
  ];
  statusOptions = ['À faire', 'En cours', 'Terminé'];
  priorityOptions = ['Haute', 'Moyenne', 'Basse'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Connecter le paginator après l'initialisation
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Remplir les données du tableau
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
          this.dataSource.data = this.dataSource.data.filter(
            (task: any) => task.id !== id
          );
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  updateStatus(taskId: string, status: string): void {
    this.taskService.updateTaskStatus(taskId, status).subscribe(
      (response) => {
        console.log('Statut mis à jour avec succès', response);
        this.getTasks(); // Recharger les tâches après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    );
  }

  // Mettre à jour la priorité d'une tâche
  updatePriority(taskId: string, priority: string): void {
    this.taskService.updateTaskPriority(taskId, priority).subscribe(
      (response) => {
        console.log('Priorité mise à jour avec succès', response);
        this.getTasks(); // Recharger les tâches après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la priorité', error);
      }
    );
  }

}

