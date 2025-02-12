import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class ApiService {
  
  private baseUrl = 'http://localhost:5204/api'; 
  private logsUrl = `${this.baseUrl}/logs`; 
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  constructor(private http: HttpClient) {}
  
  login(matricule: number, password: string): Observable<any> {
    const loginData = { Matricule: matricule, Password: password };
    return this.http.post(`${this.baseUrl}/Auth/signin`, loginData);
  }
    isUserLoggedIn(): boolean {
      return !!localStorage.getItem('matricule');
    }
  isAdmin(): boolean {
    const type = localStorage.getItem('type');
    return type === 'admin';
  }
  signup(signUpData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/signup`, signUpData);
  }
  uploadExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post(`${this.baseUrl}/Traces/upload`, formData);
  }
  getAllTraces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Traces/getAllTraces`);
  }
  searchTraces(numserie?: string, operation?: string, dateDebut?: Date, dateFin?: Date): Observable<any[]> {
    let params = new HttpParams();
      const swapDayAndMonth = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getDate()).padStart(2, '0'); // Day becomes the month
      const day = String(date.getMonth() + 1).padStart(2, '0'); // Month becomes the day
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    if (numserie) {
      params = params.set('numserie', numserie);
    }
    if (operation) {
      params = params.set('operation', operation);
    }
    if (dateDebut) {
      const formattedDateDebut = dateDebut instanceof Date ? dateDebut : new Date(dateDebut);
      if (!isNaN(formattedDateDebut.getTime())) {
        params = params.set('dateDebut', swapDayAndMonth(formattedDateDebut));
        console.log(swapDayAndMonth(formattedDateDebut));
      } else {
        console.error(`Invalid dateDebut: ${dateDebut}`);
      }
    }
    if (dateFin) {
      const formattedDateFin = dateFin instanceof Date ? dateFin : new Date(dateFin);
      if (!isNaN(formattedDateFin.getTime())) {
        params = params.set('dateFin', swapDayAndMonth(formattedDateFin));
        console.log(swapDayAndMonth(formattedDateFin));
      } else {
        console.error(`Invalid dateFin: ${dateFin}`);
      }
    }
  
    return this.http.get<any[]>(`${this.baseUrl}/Traces/search`, { params });
  }
  getAllUsers(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/Auth/users`;
    const params = { userId: userId.toString() };

    return this.http.get<any[]>(url, { params });
  }
  deleteUser(userId: number, currentUserId: number): Observable<any> {
    const url = `${this.baseUrl}/Auth/deleteuser/${userId}`;
    const params = { userId: currentUserId.toString() };

    return this.http.delete<any>(url, { params });
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Auth/edituser/${user.id}`, user);
  }
  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Auth/user/${userId}`);
  }

  updateProfile(userId: number, updatedUser: any): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.put(`${this.baseUrl}/Auth/updateprofile`, updatedUser, { params });
  }
getLogs(): Observable<any[]> {
  return this.http.get<any[]>(this.logsUrl);
}

addLog(log: any): Observable<any> {
  return this.http.post<any>(this.logsUrl, log);
}

logAction(matricule: number, action: string): Observable<any> {
  const log: any = {
    matricule: matricule,
    log: action,
    date: new Date(),
  };
  return this.addLog(log);
}
getLogsByMatricule(matricule: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/logs?matricule=${matricule}`);
}
show(): void {
  this.isLoadingSubject.next(true);
}

hide(): void {
  this.isLoadingSubject.next(false);
}


  

  
}
