import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwellService } from '../../services/swell.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ldrawer',
  templateUrl: './ldrawer.component.html',
  styleUrls: ['./ldrawer.component.css']
})
export class LdrawerComponent implements OnInit, OnDestroy {

  session: any ;
  private sessionSubscription: Subscription;

  constructor(private swellService: SwellService) { }

  ngOnInit() {
    this.sessionSubscription =
    this.swellService.session$.subscribe(session => {
      console.log('home: session update');
      this.session = session;
    });
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  logout() {

    this.swellService.endSession()
    .then(() => {

    })
    .catch(err => {

    });

  }
}
