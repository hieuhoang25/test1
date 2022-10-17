import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router:Router, private jwtHepler:JwtHelperService) { }

  public login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post<any>("/api/v1/login",data);
  }
  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/");
  }
  isAccessTokenExpired(){
    var user_str = localStorage.getItem("user");
    if ( user_str==null) return false;
    var user = JSON.parse(user_str);
    return !this.jwtHepler.isTokenExpired(user.access_token); 
  }
  isRefreshTokenExpired(){
    var user_str = localStorage.getItem("user");
    if ( user_str==null) return false;
    var user = JSON.parse(user_str);
    return !this.jwtHepler.isTokenExpired(user.refresh_token); 
  }
  getTokenWhenExpired(){
    var user_str = localStorage.getItem("user");
    if ( user_str==null) return ;
    var user = JSON.parse(user_str);
    var refresh_token ="Bearer "+user.refresh_token;
    this.http.get(environment.baseUrl+"api/v1/token/refresh?token="+refresh_token)
    .subscribe(data =>{
          localStorage.setItem("user",JSON.stringify(data));
          console.log(data)
    }, err=>{
        this.logout();
    })
  }
  getProfile(){
      return this.http.get<any>("/api/v1/profile");
  }
  updateProfile(data:any){
    return this.http.post("api/v1/profile", data);
  }
}
