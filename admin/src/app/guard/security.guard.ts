import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Page403Component } from '../page403/page403.component';
@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       var user_str = localStorage.getItem("user");
        if ( user_str==null)
        { 
          this.authService.logout(); 
          return false;
        }
        var user = JSON.parse(user_str);
        const expectedRole = route.data['role'];   
        var tokenPayLoad: any;
        if (user.access_token) {
         tokenPayLoad = decode(user.access_token);
        
       }
       if (!this.authService.isRefreshTokenExpired()){
            this.authService.logout();
            return false;
       }
       else if (!this.authService.isAccessTokenExpired()){
        this.authService.getTokenWhenExpired()
        return false;
       }
       else if (expectedRole===tokenPayLoad.roles[0]){
              return true
       }    
       else{
            route.component = Page403Component;
            return true;
       }
      return true;
  }
  
}
