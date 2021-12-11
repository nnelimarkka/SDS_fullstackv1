import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill all fields', {cssClass: "alert-danger", timeout: 3000});
      return false;
    }

    // Because the input for email is of type email this check is pretty much redundant
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please use a valid email address", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }

    this.authService.registerUser(user)
      .subscribe(data => {
        if(data.success) {
          this.flashMessage.show("Register successful, proceed to login below", {cssClass: "alert-success", timeout: 3000});
          this.router.navigate(["/login"]);
        } else {
          this.flashMessage.show("Oops! Something went wrong", {cssClass: "alert-danger", timeout: 3000});
          this.router.navigate(["/register"]);
        }
      })
  }

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
