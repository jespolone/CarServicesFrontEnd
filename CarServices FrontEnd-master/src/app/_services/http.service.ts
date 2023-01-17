import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url:string = "/api";
  //private url:string = "/localhost:8080";

  constructor(private http: HttpClient, private tokenStorageService : TokenStorageService) { }

  /**
   * Metodo per le chiamate in POST
   * @param url
   * @param body
   */
  public post(url: string, body: any): Observable<any> {
    console.log("chiamno funzione giusta");
    return this.http.post(this.url+url, body, {headers:this.getHeaders()})
  }

  /**
   *
   * @param url
   * @param body
   * @returns
   */
  public auth(url:string, body:any):Observable<any>{
    return this.http.post(this.url+url, body);
  }

  /**
   * Metodo per le PUT
   * @param url
   * @param body
   */
  public put(url: string, body: any):Observable<any>{
    return this.http.put(this.url+url, body, {headers:this.getHeaders()})
  }

  /**
   * Metodo per le chiamate in GET
   * @param url
   * @param params
   */
  public get(url: string, params?:any): Observable<any>{
    return this.http.get(this.url+url, {headers:this.getHeaders(), params:params})
  }



  /**
   * Metodo per le DELETE
   * @param url
   * @param params
   */
  public delete(url: string, params?:any): Observable<any>{
    return this.http.delete(this.url+url, {headers:this.getHeaders()});
  }

  /**
   * Metodo per la restituzione degli headers da inserire in chiamata
   * @returns
   */
  private getHeaders():HttpHeaders{
    return new HttpHeaders().set("Authorization", "Bearer "+this.tokenStorageService.getToken());
  }
}

