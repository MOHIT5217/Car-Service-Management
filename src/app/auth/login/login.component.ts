import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servic/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if (this.loginForm.valid) {
      this.authService.signIn(formData.email, formData.password).subscribe(
        resData => {
          this.router.navigate(['/client']);
        },
        errorMessage => {
          this.error = errorMessage.error.error.message;
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getEmailErrors() {
    const email = this.loginForm.get('email') as FormControl;
    if (!email.valid && email.touched && email.errors) {
      if (email.errors.required) {
        return 'Email is required';
      }
      if (email.errors.email) {
        return 'Email is not correct';
      }
    }
    return null;
  }
}
