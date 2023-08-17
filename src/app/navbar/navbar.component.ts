import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  username: string | null = localStorage.getItem("username");

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    //TODO: replace with component reload or something
    window.location.reload();
  }
}
