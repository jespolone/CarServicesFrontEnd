import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpService} from "./http.service";

const API_URL = 'http://localhost:8080/api/test/';
const AUTH_API = '/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
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
}
