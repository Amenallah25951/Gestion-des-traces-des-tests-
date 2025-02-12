import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [HttpClientModule,CommonModule, ReactiveFormsModule,FormsModule ,
    SignupRoutingModule ,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
  ],
  providers: [ApiService,provideAnimations(),ToastrService,],
})
export class SignupModule { }
