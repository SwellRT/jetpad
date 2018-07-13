import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SwellService } from '../../services/swell.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  session: any;
  private sessionSubscription: Subscription;

  launchPadForm: any;

  launchError = false;

  constructor(
    private swellService: SwellService,
    private router: Router) {
  }

  ngOnInit() {

    this.launchPadForm = new FormGroup({
      'padid': new FormControl('', [Validators.required]),
    });

    this.sessionSubscription =
      this.swellService.session$.subscribe(session => {
        this.session = session;
      });



  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  launchPad() {
    let name = this.padid.value;
    this.swellService.getObject(name)
    .then( object => {
      this.swellService.setObjectName(object.id, name)
      this.router.navigate(['/pad', object.id]);
    })
    .catch( err => {
      this.launchError = true;
    });
  }

  get padid() { return this.launchPadForm.get('padid'); }

}
