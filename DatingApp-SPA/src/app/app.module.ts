import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew} from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule, GalleryConfig } from 'ng-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { DateAgoPipe } from './pipes/date-ago.pipe';

import { AppComponent } from './app.component';
import { HttpClient } from 'selenium-webdriver/http';
import { NavComponent } from './nav/nav.component';
import { from } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ListResolver } from './_resolvers/list.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';



export const config: GalleryConfig = {
 };

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      DateAgoPipe,
      MemberMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      GalleryModule.withConfig(config),
      JwtModule.forRoot({
         config: {
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      FileUploadModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      ListResolver,
      MessagesResolver,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      },
      {provide: NgbCalendar, useClass: NgbCalendarHebrew},
      {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
