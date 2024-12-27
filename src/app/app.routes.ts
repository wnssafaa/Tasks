import { Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
    { path: 'first', component: TaskFormComponent },
    { path: '',   redirectTo: '/first', pathMatch: 'full' },
    { path: '', redirectTo: '/first', pathMatch: 'full' },

];
