import { Component } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service'; 
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  isFormVisible = true;

  constructor(
    private service: JwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
    });
    const isFormVisibleInStorage = localStorage.getItem('isFormVisible');
  this.isFormVisible = isFormVisibleInStorage !== 'false';  // Default to true if not set
   }

   resetPassword() {
    const newPassword = this.resetPasswordForm.get('password').value;
    const email = this.route.snapshot.queryParamMap.get('email');
    this.service.setPassword(email, newPassword).subscribe(
      response => {
        this.successMessage = 'Your password has been reset succesfully.You can go back and login';
        this.isFormVisible = false;  // Hide the form
        localStorage.setItem('isFormVisible', 'false');  // Store the state
      },
      error => {
        this.errorMessage = 'An error occurred while trying to reset your password.';
      }
    );
  }
  
  
  
  
  
  

}
