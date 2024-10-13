import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // Configure Routing
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) }, 
  { path: 'fundraiser', loadChildren: () => import('./fundraiser/fundraiser.module').then(m => m.FundraiserModule) }, 
  { path: 'donation', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } // Use HashLocationStrategy
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
