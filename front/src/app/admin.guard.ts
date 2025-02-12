import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const type = localStorage.getItem('type');
    if (type === 'admin') {
      return true; 
    } else {
      this.router.navigate(['/error']); 
      return false;
    }
  }
}
