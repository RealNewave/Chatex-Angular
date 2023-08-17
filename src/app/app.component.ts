import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit{

  @ViewChild("openUsernameModal") modalHack: ElementRef;

  username: string | null = localStorage.getItem("username");

  ngAfterViewInit(): void {
    if(!this.username){
      this.modalHack.nativeElement.click();
    }
  }

  hasUsername = () => {
    return this.username !== null;
  }
}
