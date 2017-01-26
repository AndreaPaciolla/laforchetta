import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {IUser} from "../user/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  // form builder simplify form initialization
  constructor(private _fb: FormBuilder, private router: Router) {
    if(localStorage.getItem('logged_user_email') != null) {
      alert("You're already logged-in. Going to restaurants...");
      this.router.navigate(['/restaurants']);
    }
  }

  ngOnInit() {
    // the long way
    this.myForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  save(model: IUser, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("logged_user_email", model.email);
      this.router.navigate(['/restaurants']);
    } else {
      // Sorry! No Web Storage support..
    }
    console.log(model, isValid);
  }

}
