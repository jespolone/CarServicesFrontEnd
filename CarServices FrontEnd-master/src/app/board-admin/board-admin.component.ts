import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from "../models/user.model";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];

  userSelected: boolean = false;

  userSelect?: User;

  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
        console.log(data);
        this.users = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );

  }

  onUserClick(id:number): void {
    this.userSelect = this.users[id];
    this.userSelected = true;
  }

  onCancel(){
    this.userSelected = false;
  }

}
