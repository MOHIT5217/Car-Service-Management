import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-service',
  templateUrl: './apply-service.component.html',
  styleUrls: ['./apply-service.component.scss']
})
export class ApplyServiceComponent implements OnInit {

  regForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      clientId: ['',[Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4),Validators.pattern('^[0-9]*$')]],
      status: ['Pending']
    });
  }

  onSubmit() {
    if(this.regForm.valid){
      console.log(this.regForm.value)
      this.http.post('http://localhost:3000/cars', this.regForm.value).subscribe(response => {
      this.router.navigate(['/client/view-status']);
    });
    }else{
      this.regForm.markAllAsTouched();
    }
  }

}
