import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auto } from 'src/app/models/auto.model';
import { AutoService } from 'src/app/_services/auto.service';
import { ModalService } from '../_services/modal.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {
    public listaAuto: Auto[]=[];
    public autoToShow!: Auto;

    showComponent: boolean = true;
    // public dialog: MatDialog,
    constructor(private autoService: AutoService,  private changeDetection: ChangeDetectorRef, public modalService: ModalService) {
   }

  ngOnInit(): void {
    this.autoService.getAllAuto().subscribe(listaAuto=>{
      if(listaAuto.length==0) {
        this.showComponent = false;
      }
      else {
        this.listaAuto = listaAuto;
        this.autoToShow = this.listaAuto[0];
      }
    });
  }


  /*openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }*/



  onAutoToShowChange(event:Auto){
    this.autoToShow=event;
  }

  onAutoToDelete(event:Auto){

    this.autoService.deleteAuto(event.id).subscribe((auto:Auto)=>{
      if(auto.id != event.id){
        console.log("Errore");
      }
      this.listaAuto.splice(this.listaAuto.indexOf(event), 1);
      this.listaAuto.length == 0 ? this.showComponent = false :  this.autoToShow = this.listaAuto[0];
      this.changeDetection.detectChanges();
    });
  }
  onAutoToAdd(auto:Auto){
    this.listaAuto.push(auto);
    this.autoToShow = auto;
    this.showComponent = true;
    this.changeDetection.detectChanges();
    this.modalService.close();
  }

}
