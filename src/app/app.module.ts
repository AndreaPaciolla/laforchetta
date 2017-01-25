import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {Routes, RouterModule} from "@angular/router";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

import { TRANSLATION_PROVIDERS } from './translate/translations';
import {TranslatePipe} from "./translate/translate.pipe";
import {TranslateService} from "./translate/translate.service";
import { RegistrationComponent } from './registration/registration.component';
import {RestaurantNameFilter} from "./restaurants/restaurants.pipe";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: RestaurantsComponent, pathMatch: 'full' },
  { path: 'restaurant-details/:id', component: RestaurantDetailsComponent, pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: 'restaurant/:id',      component: RestaurantDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    RestaurantsComponent,
    RestaurantDetailsComponent,
    TranslatePipe,
    RestaurantNameFilter,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
