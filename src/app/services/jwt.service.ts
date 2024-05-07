
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const BASE_URL = ["http://localhost:8080/auth/"]
const API_BASE_URL = "http://localhost:8080/";
const url = "http://localhost:8080/users";
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private router:Router) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('Error status:', error.status);
            console.log('Error body:', error.error);
            return throwError(error);
        })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest).pipe(
      catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error.error);
          return throwError(() => new Error(error.error || 'Unknown error'));
      })
    );
  }


  getEmailFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload);

    return payload.sub;
  }


  getUserByEmail(email) {
    return this.http.get(url + '/findByEmail/' + email, {
      headers: this.createAuhtorizationHeader(),
    });
  }

  logout(): void {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    // Optionally, navigate the user to the login page
    this.router.navigate(['/auth/login']);
  }


  // Add this method to your JwtService
  forgotPassword(email: string): Observable<any> {
    return this.http.get(API_BASE_URL + 'forgot-password', {
      params: { email: email },
      responseType: 'text'  // Add this line
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  setPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(API_BASE_URL + 'set-password', null, {
      params: { email: email },
      headers: new HttpHeaders().set('newPassword', newPassword),
      responseType: 'text'  // Add this line
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(API_BASE_URL + 'users/allUsers', {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  // Adjust the setUserAccepted method to expect a text response
  setUserAccepted(id: number): Observable<any> {
    return this.http.put(`${API_BASE_URL}users/${id}/accepted`, null, {
      responseType: 'text' // Specify the expected response type as text
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }


  updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(API_BASE_URL + 'users/' + userId + '/updateProfile', userData, {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating user profile:', error.error);
        return throwError(() => new Error(error.error || 'Unknown error'));
      })
    );
  }

  getUsersByRoleAndEtat(role: string, etat: string): Observable<any> {
    return this.http.get(API_BASE_URL + 'users/usersByRoleAndEtat/' + role + '/' + etat, {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error status:', error.status);
        console.error('Error body:', error.error);
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    // Check if the JWT exists
    return jwt != null;
  }

  public createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }


  getToken(): string | null {
    return localStorage.getItem('jwt');
  }


  isTokenExpired(token: string | null): boolean {
  if (!token) {
    return true;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp; // Expiration time of the token, UNIX timestamp
  const now = new Date().getTime() / 1000; // Current time in UNIX timestamp
  return exp < now;
}

  

}
