import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/interfaces/car';

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.scss']
})
export class ManageCarsComponent implements OnInit {

  cars: Car[] = [];
  regForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      clientId: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)]],
      status: ['', Validators.required],
    });
    this.http.get('http://localhost:3000/cars').subscribe((data: any) => {
      this.cars = data;
    });

  }

  onDelete(carId: string | undefined) {
    console.log(`http://localhost:3000/cars/${carId}`);

    this.http.delete(`http://localhost:3000/cars/${carId}`).subscribe();
  }

  selectedCarId: string | undefined;

getSingleCarData(carId: string | undefined) {
  this.selectedCarId = carId;
  this.http.get<Car>(`http://localhost:3000/cars/${carId}`).subscribe(data => {
    console.log(data);
    
    this.regForm.setValue({
      clientId: data.clientId,
      make: data.make,
      model: data.model,
      year: data.year,
      status: "Pending"
    });
  });
}

  onUpdate() {

    this.http.put(`http://localhost:3000/cars/${this.selectedCarId}`, this.regForm.value).subscribe();
  }
}
