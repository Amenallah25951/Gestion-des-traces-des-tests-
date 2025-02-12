import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {
  constructor(private traceService: ApiService, private router: Router) {}
  isAdmin: boolean = false;
  

  ngOnInit(): void {
    const type = localStorage.getItem('type');
    this.isAdmin = type === 'admin';
    if (this.traceService.isUserLoggedIn()) {
      console.log('Utilisateur connecté.');
    } else {
      console.log('Utilisateur non connecté.');
      this.router.navigate(['/login']);
    }    
  }
  logout(){
    this.addLog("Utilisateur déconnecté")
    localStorage.removeItem("matricule");
    localStorage.removeItem("type");
    this.router.navigate(['/login']);

  }
  addLog(action: string): void {
    this.traceService.logAction(Number(localStorage.getItem('matricule')), action).subscribe({
      next: (log) => {
        
      },
      error: (err) => console.error('Erreur lors de l\'ajout du log', err),
    });
  }


}
