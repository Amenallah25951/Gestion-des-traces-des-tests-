import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,],
  providers:[ApiService,provideAnimations(), ToastrService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  profile: any = { name: '', email: '', password: '', role:'' , type:'' };
  userId: number = 0;

  constructor(private authService: ApiService, private route: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    // Vérifier que l'ID utilisateur est bien disponible dans le localStorage
    const storedId = localStorage.getItem('id');
    console.log(storedId); 

    if (storedId) {
      this.userId = Number(storedId);
      console.log(this.userId); 
    } else {
      alert('Utilisateur non authentifié.');
      this.route.navigate(['/login']); // Rediriger vers la page de connexion si l'ID n'est pas trouvé
    }
  }

  // Récupérer les données du profil utilisateur


  // Mettre à jour le profil de l'utilisateur
  updateProfile() {
    this.authService.updateProfile(this.userId, this.profile).subscribe(
      (response) => {
        this.toastr.success("Profil mis à jour avec succès !")
        this.addLog("Modification de son profile " );
      },
      (error) => {
        this.toastr.error("Erreur lors de la mise à jour du profil.");
        console.error(error);
      }
    );
  }
  addLog(action: string): void {
    this.authService.logAction(Number(localStorage.getItem('matricule')), action).subscribe({
      next: (log) => {
        
      },
      error: (err) => console.error('Erreur lors de l\'ajout du log', err),
    });
  }
}
