import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //, HttpHeaders
import { Observable } from 'rxjs';
import {HttpService} from "./http.service";
import {User} from "../models/user.model";

const API_URL = 'http://localhost:8080/api/test/';
// const AUTH_API = '/api';
//
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private httpService:HttpService) { }

  getAllUsers(): Observable<any>{
    return this.httpService.get('user/all');
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  setUserRole(user:User){  //user/role-update
    return this.httpService.post("/user/role-update", user);
  }
  setUserActive(user:User){
    return this.httpService.post("/user/active-update", user);
  }

  getAllMechanical(): Observable<User[]>{
    return this.httpService.get('user/all-mechanical');
  }



  changePassword(oldPassword: string, newPassword: string, username: string): Observable<any> {
    console.log('qui ci arrivo');
    return this.httpService.post('/user/change-password', {
      oldPassword,
      newPassword,
      username,
    });
  }

  checkGrant(role : number ): string{
    switch (role){
      case 1:
        return "ADMIN";
      case 2:
        return "SERVICE";
      default:
        return "STANDARD USER";
    }
  }

  checkActive(isActive: number): String{
    switch (isActive){
      case 0:
        return "INATTIVO";
      case 1:
        return "ATTIVO";
      default:
        return "INDEFINITO";
    }
  }

  switchUserRole(user: User):User{
    user.idRuolo = user.idRuolo == 2 ? 3 : 2;
    return user;
  }

  switchUserActive(user: User):User{
    user.isactive = user.isactive == 1 ? 0 : 1;
    return user;
  }
}
