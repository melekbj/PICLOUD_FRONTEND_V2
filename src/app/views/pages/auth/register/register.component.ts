import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | undefined;
  successMessage: string;

  constructor(
    private service: JwtService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMathValidator })
  }

 
  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
}

submitForm() {
  if (this.registerForm.invalid) {
    return;
  }

  console.log(this.registerForm.value);
  this.service.register(this.registerForm.value).subscribe(
    (response) => {
      if (response.id != null) {
        this.successMessage = "Hello " + response.name + ", you have registered successfully. Please verify your email before login.";
      }
    },
    (error) => {
      if (error.error === 'Email already exists') {
        this.registerForm.get('email').setErrors({ emailTaken: true });
      }
    }
  )
}





}
