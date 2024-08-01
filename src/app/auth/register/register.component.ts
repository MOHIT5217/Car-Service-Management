import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servic/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null,[Validators.email, Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }

  onSignUp() {
    console.log(this.registerForm.value);
    const formData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    if(this.registerForm.valid){
      this.authService.signUp(formData.email, formData.password).subscribe(
        resData => {
          this.router.navigate(['/auth/login']);
        },
        errorMessage => {
          this.error = errorMessage.error.error.message;
        }
      );
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

  getEmailErrors(){
    const email = this.registerForm.get('email') as FormControl;
    if(!email.valid && email.touched && email.errors){
      if(email.errors.required){
        return "Email is required";
      }
      if(email.errors.email){
        return "Email is not correct";
      }
    }
    return null;
  }

}
