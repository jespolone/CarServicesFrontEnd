import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any = false;
  isLoggedIn: boolean = false;
  role: string = '';
  cambioPassword: boolean = false;


  constructor(private token: TokenStorageService,  private userService: UserService) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.token.getUser();
      this.role = this.userService.checkGrant(this.currentUser.idRuolo);
    }
  }

  onClick(): void{
    this.cambioPassword = true;
  }


}
