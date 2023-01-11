import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api';

const idRuolo = '3';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(nome: string, cognome: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/user/create', {
      nome,
      cognome,
      username,
      email,
      password,
      idRuolo
    }, httpOptions);
  }
}
