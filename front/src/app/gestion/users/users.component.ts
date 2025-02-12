import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule , NgxPaginationModule],
  providers: [ApiService, provideAnimations(), ToastrService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  currentUserId: number = 0;
  currentUser: any;
  userForm: FormGroup;
  page: number = 1;

  constructor(private authService: ApiService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      role: ['', Validators.required],
      type: ['', [Validators.required, Validators.pattern('^(admin|testeur)$')]], // Validation pour accepter uniquement admin ou testeur
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn() && this.authService.isAdmin()) {
      console.log('Utilisateur connecté.');
      this.currentUserId = Number(localStorage.getItem('id'));
      this.getUsers();
    } else {
      console.log('Utilisateur non connecté.');
      this.router.navigate(['/login']);
    }
  }
  onPageChange(page: number): void {
    this.page = page;
  }
  

  getUsers() {
    this.authService.getAllUsers(this.currentUserId).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        this.toastr.error('Erreur lors de la récupération des utilisateurs.');
      }
    );
  }

  deleteUser(userId: number) {
    this.authService.deleteUser(userId, this.currentUserId).subscribe(
      (response) => {
        this.toastr.success('Utilisateur supprimé avec succès.');
        this.addLog("suppression de l'utilisateur d'id "+ userId)
        this.getUsers();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        this.toastr.error('Erreur lors de la suppression de l\'utilisateur.');
      }
    );
  }

  openEditModal(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.userForm.setValue({
        name: user.name,
        email: user.email,
        matricule: user.matricule,
        role: user.role,
        type: user.type,
      });
      this.currentUser = user;
    }
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.toastr.error('Veuillez remplir correctement le formulaire.');
      return;
    }
  
    const updatedUser = {
      ...this.currentUser,
      ...this.userForm.value,
    };
  
    this.authService.updateUser(updatedUser).subscribe(
      (response) => {
        this.toastr.success('Utilisateur mis à jour avec succès.');
        this.addLog("modification de l'utilisateur d'id "+ updatedUser.id  )
        this.getUsers();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        this.toastr.error('Erreur lors de la mise à jour de l\'utilisateur.');
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
