import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,HttpClientModule,MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule, MatButtonModule],
  providers: [TaskService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager-frontend';
  showFiller = false;
  

  // Méthode pour basculer l'état du tiroir
  toggleDrawer(drawer: any): void {
    drawer.toggle();
  }
}
