import { Component, OnInit } from '@angular/core';
import { RegisterRequestModel } from 'app/auth.models';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { RedirectComponent } from 'app/redirect.component';

@Component({
  selector: 'volontulo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: RegisterRequestModel = {
    email: '',
    password: '',
    terms_acceptance: false,
  };
  ACCEPT_TERMS: string;
  registrationSuccessful: boolean = false;

  constructor(private authService: AuthService,
  ) { this.ACCEPT_TERMS = "Wyrażam zgodę na przetwarzanie moich danych osobowych" }

  register(): void {
    this.authService.register(this.registerModel.email, this.registerModel.password)
      .map(rsp => {
        console.log(rsp.status)
        if (rsp.status === 201)
          this.registrationSuccessful = true;

        return Observable.of(null);
      })
      .subscribe();
  }

  ngOnInit() {
  }

}
