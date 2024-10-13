import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationComponent } from './donation.component';

const routes: Routes = [
  // Configure home Routing
  {
    path:'',
    component:DonationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
