import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auto } from 'src/app/models/auto.model';
import { AutoService } from 'src/app/_services/auto.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {
    public listaAuto: Auto[]=[];
    public autoToShow!: Auto;

    showComponent: boolean = true;
    constructor(private autoService: AutoService,  private changeDetection: ChangeDetectorRef) {
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


  onAutoToShowChange(event:Auto){
    this.autoToShow=event;
  }

  onAutoToDelete(event:Auto){

    this.autoService.deleteAuto(event.id).subscribe((auto:Auto)=>{
      this.listaAuto.splice(this.listaAuto.indexOf(auto), 1);
      this.changeDetection.detectChanges();
      this.listaAuto.length == 0 ? this.showComponent = false :  this.autoToShow = this.listaAuto[0];
    });
  }
  onAutoToAdd(auto:Auto){
    this.listaAuto.push(auto);
    this.changeDetection.detectChanges();
    this.autoToShow = auto;
  }

}
