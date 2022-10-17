import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert.service';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  
  auth: any;
  auth2: any;
  file_image: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fileService: FileService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        console.log(profile);
        this.auth = profile;
      
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logout() {
    this.authService.logout();
  }
  closeModal(){
    this.authService.getProfile().subscribe(
      (profile) => {
        console.log(profile);
        this.auth = profile;
      
      },
      (err) => {
        console.log(err);
      }
    );
  }
  urlImage(url: string) {
    return (
      environment.prefix_firebase_cloud +
      url +
      environment.suffix_firebase_cloud
    );
  }
  selectFile(event: any): void {
    this.file_image = event.target.files[0];

    if (event.target.files.length != 0) {
      this.fileService.upload(event.target.files[0]).subscribe(
        (result) => {},
        (error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.auth.photo = this.urlImage(error.error.text);
            this.alertService.success(
              'Thông báo',
              'Cập nhật image thành công!'
            );
          } else {
            this.alertService.warn('Thông báo', 'File không hợp lệ!');
          }
        }
      );
    }
  }
  updateProfile() {
    this.authService.updateProfile(this.auth).subscribe(data =>{
    
    } , (err:HttpErrorResponse)=>{
     
      if(err.status==200){
        this.alertService.success("Thông báo ","Cập nhật thành công!")
        document.getElementById("profileModal")?.click();
      }else{
        this.alertService.warn("Cập nhật thất bại","Vui lòng kiểm tra lại thông tin!")
        console.log(err);
      }
      
    });
    }
  
}
