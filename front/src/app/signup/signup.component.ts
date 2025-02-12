import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  id: number=0;
  name: string="";
  matricule: number=0;
  email: string="";
  password: string="";
  confirmation: string="";
  role: string = '';
  type: string="";
  

  constructor(private authService: ApiService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
  }



  signUp() {
    if (!this.email || !this.password || !this.matricule || !this.role) {
      
      this.toastr.error('ERROR',"Veuillez remplir tous les champs.");
      return;
    }

    if (this.password !== this.confirmation) {
      this.toastr.error('ERROR',"Les mots de passe ne correspondent pas.");
      return;
    }

    const signUpData = {
      Id : this.id,
      Name: this.name,
      Matricule: this.matricule,
      Email: this.email,
      Password: this.password,
      Role: this.role ,
      Type: this.type 
    };

    this.authService.signup(signUpData).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
        this.toastr.success('SUCCESS',"Inscription réussie ! Bienvenue");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.toastr.error('ERROR',"Erreur lors de l\'inscription. Veuillez vérifier les informations.");
      }
    );
  }
}
