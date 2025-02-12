import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import  {  Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-traces',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule , HttpClientModule ,  NgxPaginationModule],
  providers: [ApiService,DatePipe],
  templateUrl: './traces.component.html',
  styleUrl: './traces.component.css'
  
})
export class TracesComponent implements OnInit{
  traces: any[] = []; 
  searchTerm = {
    numserie: '',
    operation: '',
    dateDebut: null ,
    dateFin: null,
  };
  selectedTrace: any = null;
  page: number = 1;

  
  showTable: boolean = false; 

  constructor(private tracesService: ApiService,private datePipe : DatePipe, private router: Router) {} // Injection du service

  ngOnInit(): void {
    if (this.tracesService.isUserLoggedIn()) {
      console.log('Utilisateur connecté.');
    } else {
      console.log('Utilisateur non connecté.');
      this.router.navigate(['/login']);
    }    
  }
  onPageChange(page: number): void {
    this.page = page;
  }

  searchTraces() {
    let start_date=this.datePipe.transform(this.searchTerm['dateDebut'], 'yyyy-MM-dd H:mm:ss')
    let end_date=this.datePipe.transform(this.searchTerm['dateFin'], 'yyyy-mm-dd H:mm:ss')
    this.searchTerm['dateDebut']=start_date;
    this.searchTerm['dateFin']=end_date;
    console.log(this.searchTerm)
    const { numserie, operation, dateDebut, dateFin } = this.searchTerm;

    const formattedDateDebut = start_date ? new Date(start_date) : undefined;
    const formattedDateFin = end_date ? new Date(end_date) : undefined;
    console.log(formattedDateDebut);
    console.log(formattedDateFin);
  

    this.tracesService
      .searchTraces(numserie, operation, formattedDateDebut, formattedDateFin)
      .subscribe(
        data => {
          console.log(data);
          this.traces = data;
          this.showTable = data.length > 0; 
          this.addLog(" Consultation des traces ");
        },
        error => {
          console.error('Erreur lors de la recherche des traces', error);
        }
      );
  }
  
  openModal(trace: any) {
    this.selectedTrace = trace;

    const modalElement = document.getElementById('traceModal') as HTMLElement;

    const modal = new Modal(modalElement);
    modal.show();
  }

  downloadTrace() {
    if (!this.selectedTrace) return;

    const content = `NumSerie: ${this.selectedTrace.numserie}
Operation: ${this.selectedTrace.operation}
Trace: 
${this.selectedTrace.trace}
Date Debut: ${this.selectedTrace.date_debut}
Date Fin: ${this.selectedTrace.date_fin}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace_${this.selectedTrace.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.addLog(" Telechargement du fichier text de la trace d'id "+ this.selectedTrace.id)
  }
  addLog(action: string): void {
    this.tracesService.logAction(Number(localStorage.getItem('matricule')), action).subscribe({
      next: (log) => {
      },
      error: (err) => console.error('Erreur lors de l\'ajout du log', err),
    });
  }
}
