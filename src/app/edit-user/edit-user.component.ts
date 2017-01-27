import { Component, OnInit } from '@angular/core';
import {IUser} from "../user/user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: IUser;
  public submitted: boolean;
  public myForm: any;

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.user = JSON.parse(localStorage.getItem('users') ).filter( usr => usr.id == params.id)[0];
    });

    this.myForm = new FormGroup({
      email: new FormControl(this.user.email, [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl(this.user.password, [<any>Validators.required, <any>Validators.minLength(5)]),
      name: new FormControl(this.user.name, [<any>Validators.required, <any>Validators.minLength(5)]),
      surname: new FormControl(this.user.surname, [<any>Validators.required, <any>Validators.minLength(2)]),
      city: new FormControl(this.user.city, [<any>Validators.required, <any>Validators.minLength(2)]),
      age: new FormControl(this.user.age, [<any>Validators.required, <any>Validators.minLength(2)])
    });
  }

  editUser(model: IUser, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    if (typeof(Storage) !== "undefined") {
      // Get all the users
      let users: Array<IUser> = JSON.parse(localStorage.getItem('users'));
      model.id = this.user.id;
      // replace the just-edited user inside the localstorage
      users = users.map( user => user.id == this.user.id ? model : user);
      localStorage.setItem('users', JSON.stringify(users));
      this._router.navigate(['/users-overview']);
    } else {
      // Sorry! No Web Storage support..
    }
    console.log(model, isValid);
  }

  deleteUser(user: IUser): void {
    let users: Array<IUser> = JSON.parse(localStorage.getItem('users'));
    users = users.filter( usr => usr.id !== user.id);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('logged_user_email');

    this._router.navigate(['/users-overview']);
  }

}
