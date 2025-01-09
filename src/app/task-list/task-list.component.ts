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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogdeletComponent } from '../dialogdelet/dialogdelet.component';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-task-list',
  imports: [CommonModule ,MatSortModule,MatFormFieldModule,MatIcon,MatSelectModule,MatCheckboxModule, MatRadioModule ,MatTableModule,MatButtonModule,RouterModule,MatPaginator, MatPaginatorModule],
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
  selectedTasks: any[] = []; // Liste des tâches sélectionnées
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private taskService: TaskService, private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.dataSource.data = data; 
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des tâches.';
        console.error(err);
      }
    });
  }

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(DialogdeletComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si l'utilisateur confirme la suppression
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
    });
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
        this.getTasks(); 
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    );
  }

  updatePriority(taskId: string, priority: string): void {
    this.taskService.updateTaskPriority(taskId, priority).subscribe(
      (response) => {
        console.log('Priorité mise à jour avec succès', response);
        this.getTasks();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la priorité', error);
      }
    );
  }
  
  toggleTaskSelection(task: any): void {
    const index = this.selectedTasks.indexOf(task);
    if (index === -1) {
      this.selectedTasks.push(task);
    } else {
      this.selectedTasks.splice(index, 1);
    }
  }
  toggleSelectAll(event: any): void {
    if (event.checked) {
      this.selectedTasks = [...this.dataSource.data]; // Sélectionner toutes les tâches
    } else {
      this.selectedTasks = []; // Désélectionner toutes les tâches
    }
  }
  toggleSelection(taskId: number, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedTasks.push(taskId);
    } else {
      const index = this.selectedTasks.indexOf(taskId);
      if (index >= 0) {
        this.selectedTasks.splice(index, 1);
      }
    }
  }

  toggleAllSelection(event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedTasks = this.dataSource.data.map((task: any) => task.id); // Sélectionner toutes les tâches
    } else {
      this.selectedTasks = []; // Désélectionner toutes les tâches
    }
  }

  // Supprimer les tâches sélectionnées
  deleteSelectedTasks(): void {
    const dialogRef = this.dialog.open(DialogdeletComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Si l'utilisateur confirme la suppression
        const tasksToDelete = this.selectedTasks.map(task => task.id);
        this.taskService.deleteTasks(tasksToDelete).subscribe({
          next: () => {
            // Supprimer les tâches du tableau après la confirmation
            this.dataSource.data = this.dataSource.data.filter(
              (task: any) => !tasksToDelete.includes(task.id)
            );
            this.selectedTasks = []; // Réinitialiser la sélection
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la suppression des tâches.';
            console.error(err);
          }
        });
      }
    });
  }

}

