import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,RouterModule,
    HttpClientModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  task: any = {
    title: '',
    description: '',
    status: 'À faire',
    priority: '',
    due_date: '',
    estimated_time: '',
    category: '',
    assigned_to: '',
    tags: '',
    comments: '',
  };

  constructor(private taskService: TaskService) {}

  // Fonction appelée lors de la soumission du formulaire
  saveTask(): void {
    console.log('Tâche enregistrée :', this.task);

    this.taskService.addTask(this.task).subscribe(
      (response) => {
        console.log('Tâche enregistrée avec succès!', response);
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la tâche:', error);
      }
    );
  }

  // Fonction pour réinitialiser le formulaire après l'enregistrement
  resetForm(): void {
    this.task = {
      title: '',
      description: '',
      status: 'À faire',
      priority: '',
      due_date: '',
      estimated_time: '',
      category: '',
      assigned_to: '',
      tags: '',
      comments: '',
    };
  }

}
