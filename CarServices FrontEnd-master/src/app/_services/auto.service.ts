import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../models/auto.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class AutoService {
    constructor(private http:HttpService) { }

    public getAllAuto(): Observable<Auto[]>{

        return this.http.get("/auto/all");
    }

    public saveAuto(auto:Auto): Observable<any>{
      return this.http.post("/auto/save",auto);
    }

    public deleteAuto(id:number): Observable<any>{
      return this.http.delete("/autodelete/" + id);
    }
}
