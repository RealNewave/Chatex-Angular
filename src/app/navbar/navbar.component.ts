import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  username: string | null = localStorage.getItem("username");

  message: string;

  ngOnInit() {
    if(!this.username || !localStorage.getItem("token")){
      this.message = "You should login first!";
    } else {
      this.message = "";
    }
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    //TODO: replace with component reload or something
    window.location.reload();
  }

}
