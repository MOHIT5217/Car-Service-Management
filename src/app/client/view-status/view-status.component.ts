import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.scss']
})
export class ViewStatusComponent implements OnInit {

  cars:Car[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/cars').subscribe((data: any) => {
      console.log(data);

      this.cars = data;
    });
  }

}
