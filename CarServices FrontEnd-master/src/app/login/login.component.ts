import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";
import { IndividualConfig } from 'ngx-toastr';
import {ToasterService, toastPayload} from "../_services/toaster.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';

  toastTitle = 'Successo';
  toastMessage = 'Login avvenuto correttamente';
  toast!: toastPayload;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.userService.checkGrant(this.tokenStorage.getUser().idRuolo);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.jwttoken);
        this.tokenStorage.saveUser(data.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.userService.checkGrant(this.tokenStorage.getUser().idRuolo);
        this.toast = {
          message: this.toastMessage,
          title: this.toastTitle,
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
            positionClass: 'toast-top-center',
          } as IndividualConfig,
        };
        this.toasterService.showToast(this.toast);
        setTimeout(() =>
          {
            window.location.href=  "/home";
          },
          1000);
      },
      err => {

        if(err.status == 400){
          this.toast = {
            message: "Username o password errata",
            title: "Errore",
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
              positionClass: 'toast-top-center',
            } as IndividualConfig,
          };
          this.toasterService.showToast(this.toast);
          this.errorMessage ="Username o password errata";
          this.isLoginFailed = true;
        }
        if(err.status == 401){
          this.toast = {
            message: "Controllare l'email per il link di attivazione, altrimenti contatta l'amministratore",
            title: "Errore, utente inattivo",
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
              positionClass: 'toast-top-center',
            } as IndividualConfig,
          };
          this.toasterService.showToast(this.toast);
          this.errorMessage ="Errore, utente inattivo/disabilitato";
          this.isLoginFailed = true;
        }
      }
    );
  }

}
