import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SwellService } from '../../services/swell.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  session: any ;
  private sessionSubscription: Subscription;

  launchPadForm: any;

  constructor(private swellService: SwellService) {
  }

  ngOnInit() {

    this.sessionSubscription =
      this.swellService.session$.subscribe(session => {
        this.session = session;
      });

      this.launchPadForm = new FormGroup({
        'padid': new FormControl('/' + this.swellService.getSwellDomain(), [Validators.required]),
      });

  }

  ngOnDestroy() {
      this.sessionSubscription.unsubscribe();
  }

  launchPad() {

  }



}
