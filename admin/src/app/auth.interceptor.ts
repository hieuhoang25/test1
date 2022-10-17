import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable } from "rxjs";


@Injectable(
  {  providedIn: 'root'}
)
export class AuthInterceptor implements HttpInterceptor {
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var user_str = localStorage.getItem("user");
        var user ;
        if ( user_str==null) user=null;
       else
         user = JSON.parse(user_str);
       
    
     console.log(req);
     if (user) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization","Bearer "+user.access_token)
        })
        return next.handle(cloned);
    }
    else{
        return next.handle(req);
    }
    }
    
}