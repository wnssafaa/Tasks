import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskService } from './task.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import{MatListModule}from '@angular/material/list';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // Pour charger les fichiers JSON de traduction
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,HttpClientModule,MatToolbarModule,
     MatButtonModule, MatIconModule,MatSidenavModule, MatButtonModule,RouterModule,MatListModule,
     TranslateModule,],
  providers: [TaskService,HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager-frontend';
  showFiller = false;
  
  toggleFiller() {

    this.showFiller = !this.showFiller;}

  // Méthode pour basculer l'état du tiroir
  toggleDrawer(drawer: any): void {
    drawer.toggle();
  }
}
