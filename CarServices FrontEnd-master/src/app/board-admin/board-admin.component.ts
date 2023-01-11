import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from "../models/user.model";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];

  userSelected: boolean = false;

  userSelect?: User;

  userRole?: String;
  userActive?: String;

  constructor(private userService: UserService) {

  }

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
    this.userRole = this.userService.checkGrant(this.userSelect.idRuolo);
    this.userActive = this.userService.checkActive(this.userSelect.isactive);
  }

  onRoleSave(): void{
    if(!this.userSelect || !this.userRole) return;
    if(this.userSelect.idRuolo == 1) return;
    this.userSelect =this.userService.switchUserRole(this.userSelect);
    let role:number = this.userSelect.idRuolo;
    this.userService.setUserRole(this.userSelect).subscribe( data =>{
      console.log(data);
      this.userRole = this.userService.checkGrant(role);
    }, error => {
      console.log('errore set ruolo:' + error.message);
      if(!this.userSelect) return;
        this.userSelect =this.userService.switchUserRole(this.userSelect);

    });
  }
  onActiveSave(): void{
    if(!this.userSelect || !this.userActive) return;
    if(this.userSelect.idRuolo == 1) return;
    this.userSelect =this.userService.switchUserActive(this.userSelect);
    let active:number = this.userSelect.isactive;
    this.userService.setUserActive(this.userSelect).subscribe( data =>{
      console.log(data);
      this.userActive = this.userService.checkActive(active);
    }, error => {
      console.log('errore set active:' + error.message);
      if(!this.userSelect) return;
        this.userSelect =this.userService.switchUserActive(this.userSelect);

    });
  }

  onCancel(){
    this.userSelected = false;
  }

}
