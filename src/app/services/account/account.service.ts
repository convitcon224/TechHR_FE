import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/loginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  login(user: any): Observable<LoginResponse> {
    this.authService.clearAuthToken();
    return this.http.post<LoginResponse>('http://localhost:8080/login', user);
  }

  loginSuccess(role: string): void {
    if (role.includes("USER")){

    } else if (role.includes("ADMIN")){
      this.router.navigate(["/admin"]);
    }
  }
}
