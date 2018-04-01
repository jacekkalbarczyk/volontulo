import { Component, OnInit } from '@angular/core';
import { AccountActivationRequestModel } from 'app/auth.models';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'volontulo-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  accountActivationRequestModel: AccountActivationRequestModel = {
    uuid: '',
  };
  activationSuccessful: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute
  ) {
    this.activationSuccessful = false;
  }

  activate(): void {
    this.authService.account_activation(this.accountActivationRequestModel.uuid)
      .subscribe(rsp => {
        if (rsp.status === 201) {
          this.activationSuccessful = true;
        }
        return Observable.of(null);
      });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.accountActivationRequestModel.uuid = params['activation_token'];
      this.activate();
    });
  }

}
