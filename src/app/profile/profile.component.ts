import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  profileForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    //TODO: getUserData
  }

  updateUserData(){
    //TODO: implement
  }
}
