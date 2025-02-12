import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, NgxPaginationModule],
  providers: [ApiService, ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {
  logs: any[] = []; 
  page: number = 1;
  matricule: number 
  | undefined  

  constructor(private logsService: ApiService) {}

  ngOnInit(): void {
    this.loadLogs();
  }
  onPageChange(page: number): void {
    this.page = page;
  }

  loadLogs(): void {
    this.logsService.getLogs().subscribe({
      next: (data) => (this.logs = data),
      error: (err) => console.error('Erreur lors du chargement des logs', err),
    });
  
  }
  searchLogs() {
    if (this.matricule) {
      this.logsService.getLogsByMatricule(this.matricule).subscribe(
        (data) => {
          this.logs = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des logs', error);
        }
      );
    }
  
  }
}
