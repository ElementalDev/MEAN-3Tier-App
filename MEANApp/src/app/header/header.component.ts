import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

}
