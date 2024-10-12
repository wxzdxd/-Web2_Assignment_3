import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundraiserRoutingModule } from './fundraiser-routing.module';
import { FundraiserComponent } from './fundraiser.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FundraiserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FundraiserRoutingModule
  ]
})
export class FundraiserModule { }
