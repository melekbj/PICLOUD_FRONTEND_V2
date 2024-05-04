import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


const BASE_URL = ["http://localhost:8080/auth/"]
const API_BASE_URL = "http://localhost:8080/";
const EVENTURL = "http://localhost:8080/event/";


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
          console.log('Error status:', error.status);
          console.log('Error body:', error.error);
          return throwError(error);
      })
  );
  }

  logout(): void {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    // Optionally, navigate the user to the login page
    this.router.navigate(['/auth/login']);
  }

  hello(): Observable<any> {
    return this.http.get(API_BASE_URL + 'api/hello', {
      headers: this.createAuhtorizationHeader() || new HttpHeaders()
    })
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

addEvent(event: any): Observable<any> {
  return this.http.post(API_BASE_URL + 'event/addEvent', event).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error body:', error.error);
      return throwError(error);
    })
  );
}

getImageUrl(id: number): Observable<any> {
  return this.http.get(API_BASE_URL + 'imageurl/' + id, {
    headers: this.createAuhtorizationHeader() || new HttpHeaders()
  }).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error status:', error.status);
      console.error('Error body:', error.error);
      return throwError(error);
    })
  );
}


getEvents(){
  return this.http.get(EVENTURL + 'getAllEvents');
}
  setPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(API_BASE_URL + 'set-password', null, {
      params: { email: email },
      headers: new HttpHeaders().set('newPassword', newPassword),
      responseType: 'text'  // Add this line
    });
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

}
