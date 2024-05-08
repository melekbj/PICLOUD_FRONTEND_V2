import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  isFormVisible: boolean; // No initial value here

  constructor(
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // Check local storage for form visibility
    this.isFormVisible = localStorage.getItem('formVisibility') !== 'hidden';

    this.route.queryParams.subscribe(params => {
      if (!params['email']) {
        this.errorMessage = 'No valid email address provided.';
        this.isFormVisible = false; // Hide form if no email parameter is found
      }
    });
  }

  resetPassword() {
    const newPassword = this.resetPasswordForm.get('password').value;
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.jwtService.setPassword(email, newPassword).subscribe(
        response => {
          this.successMessage = 'Your password has been reset successfully. You can go back and login.';
          this.isFormVisible = false; // Hide the form after successful reset
          localStorage.setItem('formVisibility', 'hidden'); // Save the state in local storage
        },
        error => {
          this.errorMessage = 'An error occurred while trying to reset your password.';
        }
      );
    } else {
      this.errorMessage = 'No valid email address provided.';
    }
  }
}
