import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getAuthToken(): string | null {
    return window.localStorage.getItem("techHR_auth_token");
  }

  setAuthToken(token: string, tokenType: string): void {
    if (token !== null) {
      window.localStorage.setItem("techHR_auth_token", `${tokenType} ${token}`);
    } else {
      window.localStorage.removeItem("techHR_auth_token");
    }
  }

  clearAuthToken(): void {
    window.localStorage.removeItem("techHR_auth_token");
  }

}
