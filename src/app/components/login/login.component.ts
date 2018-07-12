import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SwellService } from '../../services/swell.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  onFlight = false;

  loginForm: any;

  constructor(
    private swellService: SwellService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'userid': new FormControl('@' + this.swellService.getSwellDomain(), [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(2)])
    });

  }

  submitLogin() {
    this.onFlight = true;
    this.swellService.startSession(this.userid.value, this.password.value)
    .then(userid => {
      this.router.navigate(['/home']);
    })
    .catch(err => {
    })
    .finally( () => {
      this.onFlight = false;
    });

  }

  submitCreate() {
    this.onFlight = true;
    this.swellService.createUser(this.userid.value, this.password.value, {})
    .then(profile => {
    })
    .catch(err => {
    })
    .finally(() => {
      this.onFlight = false;
    });
  }


  goBack() {
    this.location.back();
  }

  get userid() { return this.loginForm.get('userid'); }

  get password() { return this.loginForm.get('password'); }
}
