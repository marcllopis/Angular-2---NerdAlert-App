import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { AddPhoneComponent } from './add-phone/add-phone.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { HelperDetailsComponent } from './helper-details/helper-details.component';
import { SessionService } from './session.service';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'search/:id', component: HelperDetailsComponent, canActivate: [SessionService] },
  { path: 'profile', component: ProfileComponent, canActivate: [SessionService] },
  { path: 'inbox', component: InboxComponent, canActivate: [SessionService] },
  { path: 'add', component: AddPhoneComponent, canActivate: [SessionService] },
  { path: 'phone', component: PhoneListComponent, canActivate: [SessionService] },
  { path: 'phone/:id', component: PhoneDetailsComponent, canActivate: [SessionService] },
  { path: '**', redirectTo: '' }
];
