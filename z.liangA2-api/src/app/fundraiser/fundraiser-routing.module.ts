import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundraiserComponent } from './fundraiser.component';

const routes: Routes = [
  // Configure home Routing
  {
    path:'',
    component:FundraiserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundraiserRoutingModule { }
