import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {IUser} from "../user/user.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder, private router: Router) { } // form builder simplify form initialization

  ngOnInit() {
    // the long way
    this.myForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      surname: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      city: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      age: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)])
    });
  }

  save(model: IUser, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("logged_user_email", model.email);
      // Get all the users
      let users: Array<IUser> = JSON.parse(localStorage.getItem('users'));
      // check if there is already a user with my email
      if(users.filter( usr => usr.email === model.email).length > 0) {
        alert("User already registered");
        this.router.navigate(['/restaurants']);
        return;
      }
      // if there isn't... save the user
      users.push(model);
      localStorage.setItem('users', JSON.stringify(users));
      this.router.navigate(['/restaurants']);
    } else {
      // Sorry! No Web Storage support..
    }
    console.log(model, isValid);
  }

}
