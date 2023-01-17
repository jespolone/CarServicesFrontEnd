import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Auto } from '../../models/auto.model';
@Component({
  selector: 'app-auto-item',
  templateUrl: './auto-item.component.html',
  styleUrls: ['./auto-item.component.css']
})
export class AutoItemComponent implements OnInit {
  @Input() auto!: Auto;
  @Output() autoToShow: EventEmitter<Auto> = new EventEmitter<Auto>();
  @Output() autoToDelete: EventEmitter<Auto> = new EventEmitter<Auto>();

  ngOnInit(): void {
  }

  onAutoClick(){
    if(this.autoToShow) this.autoToShow.emit(this.auto);
  }

  onAutoDelete(){
    this.autoToDelete.emit(this.auto);
  }

}
