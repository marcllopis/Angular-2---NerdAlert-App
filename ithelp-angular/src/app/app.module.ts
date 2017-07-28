import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { PhoneService } from './phone.service';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { FileSelectDirective } from "ng2-file-upload";
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from "angular2-google-maps/core";

import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilterPipe } from './pipes/filter-search.pipe';
import { NewDatePipe } from './pipes/new-date.pipe';
import { HelperDetailsComponent } from './helper-details/helper-details.component';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AlertModule } from 'ng2-bootstrap/alert';
import { RatingModule } from 'ng2-bootstrap/rating';


@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent,
    PhoneDetailsComponent,
    FileSelectDirective,
    AddPhoneComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    InboxComponent,
    SearchResultsComponent,
    FilterPipe,
    NewDatePipe,
    HelperDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAKaMtajBkWNsRibGEZIMIY7AsQPmzBEuQ",
      libraries: ["places"]
    }),
    RouterModule.forRoot(routes)
  ],

  providers: [PhoneService, UserService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
