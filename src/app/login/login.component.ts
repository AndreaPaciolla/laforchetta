import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {User} from "./user.interface";
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

  constructor(private _fb: FormBuilder, private router: Router) { } // form builder simplify form initialization

  ngOnInit() {
    // the long way
    this.myForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  save(model: User, isValid: boolean) {
    this.submitted = true; // set form submit to true
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("user_email", model.email);
      localStorage.setItem("password", model.password);
      this.router.navigate(['/restaurants']);
    } else {
      // Sorry! No Web Storage support..
    }
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
  }

}
