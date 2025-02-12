import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule , HttpClientModule ,
  ],
  providers: [ApiService ,provideAnimations(),ToastrService,],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
    

  selectedFile: File | null = null;
  constructor(private traceService: ApiService, private router: Router,private toastr: ToastrService) {}
  ngOnInit(): void {
    if (this.traceService.isUserLoggedIn()) {
      console.log('Utilisateur connecté.');
    } else {
      console.log('Utilisateur non connecté.');
      this.router.navigate(['/login']);
    }    
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Télécharger le fichier
  onUpload(): void {
    this.traceService.show();
    if (this.selectedFile) {
      console.log('Fichier sélectionné:', this.selectedFile);
      this.traceService.uploadExcel(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Réponse du backend:', response);
          this.traceService.hide();
          this.toastr.success("success",'Données enregistrées ou mises à jour avec succès.');
          this.addLog("Telechargement de fichier Excel des traces ");
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement:', error);
          this.toastr.error('Erreur lors du téléchargement.', 'Error');
        }
      });
    } else {
      this.traceService.hide();
      this.toastr.error('Aucun fichier sélectionné', 'Error');
    }
  }
  addLog(action: string): void {
    this.traceService.logAction(Number(localStorage.getItem('matricule')), action).subscribe({
      next: (log) => {
        
      },
      error: (err) => console.error('Erreur lors de l\'ajout du log', err),
    });
  }
}
function provideToastr(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

