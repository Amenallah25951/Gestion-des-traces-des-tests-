import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    GestionComponent
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
    HttpClientModule
  ],
  providers: [ApiService],

})
export class GestionModule { }
