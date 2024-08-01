import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyServiceComponent } from './apply-service/apply-service.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { ClientRoutingModule } from './client-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApplyServiceComponent,
    ClientDashboardComponent,
    ManageCarsComponent,
    ViewStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
