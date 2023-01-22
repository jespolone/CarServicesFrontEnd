import { HttpService } from './http.service';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Intervento} from "../models/intervento.model";

@Injectable({
  providedIn: 'root'
})


export class InterventoService{
  constructor(private http:HttpService) { }

  public getUserDate(userId : String): Observable<Intervento[]>{
    // let params = new HttpParams().set("userId", userId);
    // console.log(params);
    return this.http.get("/userdate" + userId);
  }

  public createDate(date:Intervento): Observable<any>{
    return this.http.post("/date/save", date);
  }

  // public deleteAuto(id:number): Observable<any>{
  //   return this.http.delete("/autodelete/" + id);
  // }

}
