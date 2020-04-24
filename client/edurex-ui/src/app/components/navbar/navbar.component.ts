import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  themeList :String[] = ["indigo-pink","pink-bluegrey","teal-cyan","yellow-brown","deeppurple-amber"]
  constructor() { }

  ngOnInit(): void {
  }

  @Output("toggleDarkness")
  toggleDarkness : EventEmitter<any> = new EventEmitter();

  @Output("setTheme")
  setTheme : EventEmitter<String> = new EventEmitter<String>();

  changeTheme(theme : String)
  {
    this.setTheme.next(theme);
  }


  toggleDarkMode()
  {
      this.toggleDarkness.emit();
  }

  

}
