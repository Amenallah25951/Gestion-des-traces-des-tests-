import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
  constructor(private traceService: ApiService, private router: Router) {}
  isAdmin: boolean = false;
  name: string | null = null;

  

  ngOnInit(): void {
    
    const type = localStorage.getItem('type');
    this.isAdmin = type === 'admin';
    if (this.traceService.isUserLoggedIn()) {
      console.log('Utilisateur connecté.');
      this.name=localStorage.getItem('name');
    } else {
      console.log('Utilisateur non connecté.');
      this.router.navigate(['/login']);
    }    
  }
  logout(){
    localStorage.removeItem("matricule");
    localStorage.removeItem("type");
    this.router.navigate(['/login']);

  }

}
