import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [   HttpClientModule,CommonModule, ReactiveFormsModule , LoginRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
    FormsModule ,
  ],
  providers: [ApiService,provideAnimations(), ToastrService],

})
export class LoginModule { }
