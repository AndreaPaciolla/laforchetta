import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: any;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.user = JSON.parse(localStorage.getItem( params.id ) );
    });
  }

  ngOnInit() {
  }

}
