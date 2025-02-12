import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoadingComponent,
    
],
providers:[ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'front';
  isLoading: boolean = false; // Initialize the property

  constructor(private loadingService: ApiService) {
    // Subscribe to the loading service to dynamically control the spinner
    this.loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  
}
