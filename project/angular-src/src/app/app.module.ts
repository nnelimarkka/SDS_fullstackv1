import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { My404Component } from './components/my404/my404.component';
import { AuthGuard } from './guards/auth.guard';
import { PostService } from './services/post.service';
import { CommentsComponent } from './components/comments/comments.component';


const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "comments/:title", component: CommentsComponent},
  {path: "**", component: My404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    My404Component,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
