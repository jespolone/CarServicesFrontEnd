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
    {title: 'First Slide', desc: 'First Slide Description', src: '/assets/img/1.jpg'},
    {title: 'Second Slide', desc: 'Second Slide Description', src: "/assets/img/2.jpg"},
    {title: 'Third Slide', desc: 'Third Slide Description', src: "/assets/img/3.jpg"},
    {title: 'IV Slide', desc: 'IV Slide Description', src: "/assets/img/4.jpg"}
  ];
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
  }

}
