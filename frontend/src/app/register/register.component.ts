import { Component, OnInit } from '@angular/core';
import { RegisterRequestModel } from 'app/auth.models';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { RedirectComponent } from 'app/redirect.component';
import { Params } from '@angular/router';
import { error } from 'selenium-webdriver';
@Component({
  selector: 'volontulo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: RegisterRequestModel = {
    email: '',
    password: '',
  };
  ACCEPT_TERMS: string;
  registrationSuccessful: boolean;
  userIsAuthenticated: boolean;

  constructor(private authService: AuthService,
  ) {
    this.ACCEPT_TERMS = 'Wyrażam zgodę na przetwarzanie moich danych osobowych';
    this.registrationSuccessful = false;
    this.userIsAuthenticated = false;
  }

  register(): void {
    this.registrationSuccessful = false;
    this.userIsAuthenticated = false;
    this.authService.register(this.registerModel.email, this.registerModel.password)
      .subscribe(rsp => {
        if (rsp.status === 201) {
          this.registrationSuccessful = true;
        }
        return Observable.of(null);
      },
      err => {
        if (err.status === 400) {
          this.userIsAuthenticated = true;
        }
      }
      );
  }

  ngOnInit() {
  }

}
