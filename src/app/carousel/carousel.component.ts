import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  images = [
    '../../assets/banner1.jpg',
    '../../assets/banner2.jpg',
    '../../assets/banner3.jpg',
  ];
}
