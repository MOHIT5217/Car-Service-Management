import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CarListComponent } from './car-list/car-list.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'car-list', component: CarListComponent },
  { path: 'update-status', component: UpdateStatusComponent },
  { path: 'generate-invoice', component: GenerateInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
