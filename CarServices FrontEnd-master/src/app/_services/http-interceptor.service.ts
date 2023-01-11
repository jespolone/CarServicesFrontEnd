import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent, HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable, throwError} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private spinnerQueue:number = 0;

  constructor(private spinner:NgxSpinnerService) {
  }


  /**
   * Metodo per l'intercpt delle chiamate REST
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Avvio lo spinner eccetto per le notifiche
    if(req.url.search('/notifiche') === -1){
      this.spinner.show();
      this.spinnerQueue++;
    }

    //variabili per il check degli eventi
    let error: HttpErrorResponse;
    let responseObject: HttpEvent<any>;

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      responseObject = event;
      if (!(responseObject instanceof HttpResponse)) {
        return responseObject;
      }
      return this.onSuccess(req, responseObject);
    }),catchError((err: any)  => {
      //Gestione in caso di chiamate andate in  errore
      error = err;
      this.onError(req, error);
      return throwError(err);
    }), finalize( () => {
      //Gestione in caso di chiamate annullate
      if (responseObject.type === HttpEventType.Sent && !error) {
        this.hideSpinner();
      }
      return throwError(error);
    }));

  }
  /**
   * Metodo eseguito nel caso in cui la chiamata non abbia alcun errore
   * @param request
   * @param response
   */
  private onSuccess(request:any, response:any){
    this.hideSpinner();
  }

  /**
   * Metodo eseguito in caso di errore di chiamata
   * @param request
   * @param response
   */
  private onError(request:any, response:any){
    let message = '';
    if(response != null && response.error != null && response.error.descrizione != null){
      message = response.error.descrizione;
    }else{
      message =  "Errore nell'esecuzione dell'azione richiesta";
    }
    console.log(message);
    this.hideSpinner();
  }

  /**
   * Metodo per la gestione dello spinner
   */
  private hideSpinner(): void {
    if(this.spinnerQueue > 0){
      this.spinnerQueue--;
    }
    if (this.spinnerQueue === 0) {
      this.spinner.hide();
    }
  }
}
