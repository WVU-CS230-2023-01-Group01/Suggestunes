import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() name: string;
  @Input() link: string;
  @Input() img: string;

  constructor(private router:Router) {
    this.img ="No image";
    this.name = "No name";
    this.link = "No link";
  }

  reroute():void {
    this.router.navigate([this.link]);
  }

  ngOnInit(): void {

  }
}
