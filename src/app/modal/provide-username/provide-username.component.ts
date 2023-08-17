import {Component} from '@angular/core';

@Component({
  selector: 'app-provide-username',
  templateUrl: './provide-username.component.html'
})
export class ProvideUsernameComponent {
  setUsername = (username: string) => {
    localStorage.setItem("username", username);
    window.location.reload();
  }

}
