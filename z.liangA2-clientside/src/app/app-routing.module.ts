import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // Configure Routing
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) }, 
  { path: 'fundraiser', loadChildren: () => import('./fundraiser/fundraiser.module').then(m => m.FundraiserModule) }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
