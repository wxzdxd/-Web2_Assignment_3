import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DonationComponent],
  imports: [
    CommonModule,
    DonationRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DonationModule { }
