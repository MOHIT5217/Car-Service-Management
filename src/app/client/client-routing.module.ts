import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ApplyServiceComponent } from './apply-service/apply-service.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { ViewStatusComponent } from './view-status/view-status.component';

const routes: Routes = [
    { path: '', component: ClientDashboardComponent },
    { path: 'apply-service', component: ApplyServiceComponent },
    { path: 'manage-cars', component: ManageCarsComponent },
    { path: 'view-status', component: ViewStatusComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }