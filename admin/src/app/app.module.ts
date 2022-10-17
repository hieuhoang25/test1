import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { Page403Component } from './page403/page403.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function tokenGetter() {
  var user_str = localStorage.getItem("user");
  if ( user_str==null) return null;
  else{
    var user = JSON.parse(user_str);
    return user.access_token;
  }

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    Page403Component,
   
  ],
  imports: [   FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    NgToastModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        
      },
    })
  ],
  providers: [  AuthService, DatePipe,
    { 
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
