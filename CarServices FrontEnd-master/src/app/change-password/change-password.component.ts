import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {
    vecchiaPassword: null,
    password: null,
    repeatPassword: null
  };

  username: string = '';
  isSuccessful: boolean = false;
  errorMessage: string= '';
  constructor(private tokenStorage: TokenStorageService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().username;
  }

  onSubmit():void{
    const {vecchiaPassword, password, repeatPassword } = this.form;
    if(password!=repeatPassword){
      //gestisci errore
    }
    console.log(vecchiaPassword);
    console.log(password);
    console.log(repeatPassword);

    this.userService.changePassword(vecchiaPassword, password, this.username).subscribe(
      data => {
        this.isSuccessful=true;
        console.log(data);
        console.log('Richiesta cambio password effettuata');
        //this.reloadPage();
      },
      err => {
        this.isSuccessful=false;
        this.errorMessage = err.error.message;
      }
    );

  }
  reloadPage(): void {
    window.location.reload();
  }

}
