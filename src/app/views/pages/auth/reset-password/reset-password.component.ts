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

  constructor(
    private service: JwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
    });
   }

   resetPassword() {
    const newPassword = this.resetPasswordForm.get('password').value;
    const email = this.route.snapshot.queryParamMap.get('email');
    this.service.setPassword(email, newPassword).subscribe(
      response => {
        alert('Your password has been reset.');
        this.router.navigate(['/auth/login']);  // Add this line
      },
      error => alert('An error occurred while trying to reset your password.')
    );
  }
  
  
  

}
