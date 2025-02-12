
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  matricule: string = '';
  password: string = '';

  constructor(private authService: ApiService, private router: Router,private toastr: ToastrService ) {}
  ngOnInit(): void {
  }

  login() : void {
    this.authService.show();
    this.authService.login(+this.matricule, this.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('id', response.userId);
        localStorage.setItem('name', response.name);
        localStorage.setItem('matricule', response.matricule);
        localStorage.setItem('type', response.type);
        this.authService.hide();
        this.router.navigate(['/acceuil']);
        
        this.addLog("Utilisateur connecté");
        
        
      },
      error: (error) => {
        this.authService.hide();
        this.toastr.error(error.error);
        
      },
    });
  }
  addLog(action: string): void {
    this.authService.logAction(Number(localStorage.getItem('matricule')), action).subscribe({
      next: (log) => {
        
      },
      error: (err) => console.error('Erreur lors de l\'ajout du log', err),
    });
  }
  

}
