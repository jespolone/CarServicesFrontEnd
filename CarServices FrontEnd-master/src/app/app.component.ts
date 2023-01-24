import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {UserService} from "./_services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private role?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserCar = false;
  username?: string;
  name?: string;
  surname?: string;


  constructor(private tokenStorageService: TokenStorageService, private  userService: UserService) {
  }



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = this.userService.checkGrant(user.idRuolo);
      this.showUserCar = this.role == 'STANDARD USER';
      this.showAdminBoard = this.role == 'ADMIN';
      this.showModeratorBoard = this.role =='SERVICE';

      this.username = user.username;
      this.name = user.nome;
      this.surname = user.cognome;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
