import { Component, OnInit } from '@angular/core';
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
    constructor(private autoService: AutoService) {
   }

  ngOnInit(): void {
    this.autoService.getAllAuto().subscribe(listaAuto=>{
      this.listaAuto=listaAuto;
      this.autoToShow=this.listaAuto[0];
      console.log("auto.component");
    });

  }

  onAutoToShowChange(event:Auto){
    this.autoToShow=event;
  }

  onAutoToDelete(event:Auto){


    this.autoService.deleteAuto(event.id).subscribe((auto:Auto)=>{
      console.log(auto);
    });
  }

}
