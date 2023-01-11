import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Auto } from 'src/app/models/auto.model';
import { AutoService } from 'src/app/_services/auto.service';

@Component({
  selector: 'app-aggiungi-auto',
  templateUrl: './aggiungi-auto.component.html',
  styleUrls: ['./aggiungi-auto.component.css']
})
export class AggiungiAutoComponent implements OnInit {

  private auto!:Auto;

  public formGroup:FormGroup = this.fb.group({
    marca: new FormControl(''),
    modello: new FormControl(''),
    targa: new FormControl(''),
    anno: new FormControl(''),
    colore: new FormControl(''),
  });

  constructor(private fb:FormBuilder, private autoService: AutoService){
    this.auto = Object.assign({})
  }

  ngOnInit(): void {

  }

  onAutoAdd(){
    Object.assign(this.auto, this.formGroup.value);
    this.autoService.saveAuto(this.auto).subscribe((auto:Auto)=>{
      console.log(this.auto);
    });

  }

}

