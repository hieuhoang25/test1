import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users!: IUser[] ;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchAll().subscribe(data => {
      this.users = data;
    }, err => console.log(err))
  }

}
