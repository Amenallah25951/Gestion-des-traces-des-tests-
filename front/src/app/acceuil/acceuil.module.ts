import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceuilRoutingModule } from './acceuil-routing.module';
import { AcceuilComponent } from './acceuil.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';


@NgModule({
  declarations: [
    AcceuilComponent
  ],
  imports: [
    CommonModule,
    AcceuilRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
})
export class AcceuilModule { }
