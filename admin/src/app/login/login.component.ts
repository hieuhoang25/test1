import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  onSelect(event:any) {
    console.log(event);
  }
  constructor(private alert:AlertService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  
  
  public logIn(data:any){
    localStorage.removeItem("user");
    this.auth.login(data.username, data.password).subscribe(result =>{
      this.alert.success("Message","Login successfully!");
      var user = {
        access_token:result.tokens.access_token,
        refresh_token:result.tokens.refresh_token
      }
      localStorage.setItem("user", JSON.stringify(user));
      console.log(result)
      this.router.navigateByUrl("/workspace");
      sessionStorage.setItem('token',JSON.stringify(result))
    },err=>{
      this.alert.warn("Login Failed!", "Please recheck username and password");
      console.log(err)
    })
  }
  
}
