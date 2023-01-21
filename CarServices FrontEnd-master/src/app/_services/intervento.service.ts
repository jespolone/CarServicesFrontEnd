import { HttpService } from './http.service';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Auto} from "../models/auto.model";
import {Intervento} from "../models/intervento.model";

@Injectable({
  providedIn: 'root'
})


export class InterventoService{
  constructor(private http:HttpService) { }

  public getUserDate(userId : number): Observable<Auto[]>{
    return this.http.get("/userdate",userId);
  }

  public createDate(date:Intervento): Observable<any>{
    return this.http.post("/date/save", date);
  }

  // public deleteAuto(id:number): Observable<any>{
  //   return this.http.delete("/autodelete/" + id);
  // }

}