import {Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Auto } from 'src/app/models/auto.model';
import { AutoService } from 'src/app/_services/auto.service';
import {ToasterService, toastPayload} from "../../_services/toaster.service";
import {IndividualConfig} from "ngx-toastr";

@Component({
  selector: 'app-aggiungi-auto',
  templateUrl: './aggiungi-auto.component.html',
  styleUrls: ['./aggiungi-auto.component.css']
})
export class AggiungiAutoComponent{

  private auto!:Auto;
  //selectedAuto: string = "GB";
  toastTitle = 'Errore';
  toastMessage = 'Completa tutti i campi correttamente';
  toast!: toastPayload;

  @Output() autoToAdd: EventEmitter<Auto> = new EventEmitter<Auto>();
  public formGroup:FormGroup = this.fb.group({
    marca: new FormControl(''),
    modello: new FormControl(''),
    targa: new FormControl(''),
    anno: new FormControl(''),
    colore: new FormControl(''),
  });

  constructor(private fb:FormBuilder, private autoService: AutoService, private toasterService: ToasterService){
    this.auto = Object.assign({})
  }



  onSubmit(){
    if(!this.formGroup.valid){
      this.toast = {
        message: this.toastMessage,
        title: this.toastTitle,
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
          positionClass: 'toast-top-center',
        } as IndividualConfig,
      };
      this.toasterService.showToast(this.toast);
      return;
    }
    Object.assign(this.auto, this.formGroup.value);
    this.autoService.saveAuto(this.auto).subscribe((auto:Auto)=>{
        this.toastMessage = "L'auto " + auto.marca + " " + auto.modello + " e' stata aggiunta correttamente";
        this.toastTitle = "Successo";
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
      this.autoToAdd.emit(auto);
    },
      err => {
      console.log("Errore db: " + err.status);
      });

  }

}

