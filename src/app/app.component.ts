import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fork!';

  constructor() {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("user1", JSON.stringify({'username':'andreapaciolla@gmail.com', 'password': 'k1'}));
      localStorage.setItem("user2", JSON.stringify({'username':'andrewpacio@gmail.com', 'password': 'k2'}));
    }
  }

}
