import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {  

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("document:scroll", []) onWindowScroll() {
    console.log("scrollActivated");
  }


  onScrollClick(scrollElement, valueToScroll){
    scrollElement.scrollTo({ left: ( valueToScroll), behavior: 'smooth' });
  }
}
