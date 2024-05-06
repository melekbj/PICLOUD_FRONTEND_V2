import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {JwtService} from "../services/jwt.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        // JWT token has expired, refresh it
        const refreshTokenRequest = {}; // Fill this with any necessary information
        this.jwtService.refreshToken(refreshTokenRequest).subscribe(
          (response) => {
            // Save the new token in local storage
            localStorage.setItem('jwt', response.jwt);
            // Clone the original request and set the new token in the header
            const clonedRequest = request.clone({
              headers: request.headers.set("Authorization", "Bearer " + response.jwt)
            });
            // Retry the failed request with the new token
            return next.handle(clonedRequest);
          },
          (error) => {
            // Handle errors from the refresh token request
            return throwError(error);
          }
        );
      }
      return throwError(err);
    }));
  }
}
