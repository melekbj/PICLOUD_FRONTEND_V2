import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ClubService } from './club.service';

const BASE_URL = ["http://localhost:8089/auth/"]
const API_BASE_URL = "http://localhost:8089/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private router:Router,

    private userService:UserService,
    private clubService:ClubService
  ) { }

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
    localStorage.clear();
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
    if(jwt!=null)
    this.getiduserinlocalstorage()
    return jwt != null;
  }
 

  private createAuhtorizationHeader() {
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
  getemail(): string | null{
    const token = this.getToken();
    const payload = token.split('.')[1];
const decodedPayload = JSON.parse(atob(payload));
//alert(decodedPayload.sub);
//console.log(decodedPayload);
return decodedPayload.sub;
   }
   getiduserinlocalstorage(){
    
  let email=this.getemail();
  this.userService.getUserbyemail(email).subscribe(
    (res)=>{
      console.log(res);
      console.log(res.id);
      localStorage.setItem('idUser', res.id.toString()); 
      //alert(localStorage.getItem('idUser'));
      //alert(res.role);
      
      localStorage.setItem('Role', res.role); 
      if(localStorage.getItem('Role')=="ADMIN"){
        if (!localStorage.getItem('reloaded')) {
          // Set the 'reloaded' flag in the local storage
          localStorage.setItem('reloaded', 'true');
          location.reload();
        } else {
          // Remove the 'reloaded' flag from the local storage
          localStorage.removeItem('reloaded');
        }
      }
      //alert(localStorage.getItem('Role'));
      this.clubService.getClubByUserAndPresident(res.id).subscribe(
        (res)=>{
          console.log(res);
          console.log(res.id);
          localStorage.setItem('idClub', res.id.toString()); 
          if (!localStorage.getItem('reloaded')) {
            // Set the 'reloaded' flag in the local storage
            localStorage.setItem('reloaded', 'true');
            location.reload();
          } else {
            // Remove the 'reloaded' flag from the local storage
            localStorage.removeItem('reloaded');
          }
         // alert(localStorage.getItem('idClub'));
        }
      ) 
     
    }
  )

  }
}
