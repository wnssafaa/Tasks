import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import {FormControl,} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialgosucssComponent } from '../dialgosucss/dialgosucss.component';
import { DialogmodifierComponent } from '../dialogmodifier/dialogmodifier.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,RouterModule,
    HttpClientModule,   ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,MatIcon,
        MatFormFieldModule,CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  isEditMode: boolean = false;
  taskId: number | null = null;
 
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService,
    private router: Router, private route: ActivatedRoute,public dialog: MatDialog) {
      this.taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        status: ['À faire', Validators.required],
        priority: ['', Validators.required],
        due_date: [''],
        estimated_time: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        category: [''],
        assigned_to: [''],
        tags: [''],
        comments: [''],
        start_date: [''],  
        end_date: [''],   
      });
      
  }
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    this.taskId = id !== null ? Number(id) : null;
    this.isEditMode = !!this.taskId;
  
    if (this.isEditMode && this.taskId) {
      this.loadTaskDetails(this.taskId.toString());
    }
    
  }
  
  loadTaskDetails(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe(
      (task) => {
        console.log('Données reçues depuis l\'API:', task);
        if (task) {
          this.taskForm.patchValue({
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'À faire',
            priority: task.priority || 'Moyenne',
            due_date: task.due_date || '',
            estimated_time: task.estimated_time || '',
            category: task.category || '',
            assigned_to: task.assigned_to || '',
            tags: task.tags || '',
            comments: task.comments || '',
            start_date: task.start_date || '',  // Remplir le champ start_date
            end_date: task.end_date || '',      // Remplir le champ end_date
          });
          console.log('Valeurs du formulaire après le patch:', this.taskForm.value);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la tâche:', error);
      }
    );
  }
  
  
  
  saveTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
  
      if (this.isEditMode && this.taskId) {
       
        this.taskService.updateTask(this.taskId, taskData).subscribe(
          (response) => {
            console.log('Tâche mise à jour avec succès!', response);
            this.oeditDialog(); 
            this.router.navigate(['/list']); 
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
          }
        );
      } else {
       
        this.taskService.addTask(taskData).subscribe(
          (response) => {
            console.log('Tâche créée avec succès!', response);
            this.openDialog();
            this.router.navigate(['/list']); 
          },
          (error) => {
            console.error('Erreur lors de la création de la tâche:', error);
          }
        );
      }
    } else {
      console.error('Formulaire invalide');
    }
  }
  
  openDialog(): void {
    this.dialog.open(DialgosucssComponent, {
      data: {
        title: 'Ajout réussi',
        message: 'Votre tâche a été ajoutée avec succès !'
      },
      width: '800px',
    });
  }
  oeditDialog(): void {
    this.dialog.open(DialogmodifierComponent, {
      data: {
        title: 'modification  réussi',
        message: 'Votre tâche a été modifier avec succès !'
      },
      
      width: '800px', 
    });
  }
}
