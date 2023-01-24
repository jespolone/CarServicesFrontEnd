import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  title = 'angular-app';

  images = [
    {title: 'A ROMA', desc: 'LA TUA OFFICINA AUTORIZZATA', src: '/assets/img/1.jpg'},
    {title: 'A ROMA', desc: 'LA TUA OFFICINA AUTORIZZATA', src: "/assets/img/2.jpg"},
    {title: 'A ROMA', desc: 'LA TUA OFFICINA AUTORIZZATA', src: "/assets/img/3.jpg"},
    {title: 'A ROMA', desc: 'LA TUA OFFICINA AUTORIZZATA', src: "/assets/img/4.jpg"}
  ];
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

}
