import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = environment.firebaseAPIKey;
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Sign up a new user
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  // Sign in an existing user
  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }
  

  // Handle logout
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth/login']);
  }

  // Auto-login if user data is present in local storage
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData || !userData._token) {
      return;
    }

    const loadedUser = {
      email: userData.email,
      id: userData.id,
      _token: userData._token,
      _tokenExpirationDate: new Date(userData._tokenExpirationDate)
    };

    if (new Date(userData._tokenExpirationDate) > new Date()) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  // Automatically log out user after token expires
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Handle the authentication response and store user data
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = {
      email: email,
      id: userId,
      _token: token,
      _tokenExpirationDate: expirationDate
    };
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Get the current user role
  getUserRole(): string | null {
    const user = this.user.getValue();
    if (!user) {
      return null;
    }
    return user.role;
  }

  // Check if the current user is an admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  // Check if the current user is a client
  isClient(): boolean {
    return this.getUserRole() === 'client';
  }
}
