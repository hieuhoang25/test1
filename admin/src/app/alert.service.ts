import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast:NgToastService) { }
  success(title:string, message:string) {
    this.toast.success({detail:title,summary:message,duration:3000});
  }
  
  error(title:string, message:string) {
    this.toast.error({detail:title,summary:message,duration:3000});
  }

  info(title:string, message:string) {
 
    this.toast.info({detail:title,summary:message,duration:3000});
  }

  warn(title:string, message:string) {
    this.toast.warning({detail:title,summary:message,duration:3000});
  }
}
