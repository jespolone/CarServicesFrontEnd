import { Component, OnInit } from '@angular/core';
import { Auto } from '../../models/auto.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-auto-details',
  templateUrl: './auto-details.component.html',
  styleUrls: ['./auto-details.component.css']
})
export class AutoDetailsComponent implements OnInit {
  @Input() autoToShow!:Auto;
  constructor() { }

  ngOnInit(): void {
  }

}
