import { Component, OnInit, OnDestroy } from '@angular/core';
import { PadService } from '../../../services/pad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pad-container',
  templateUrl: './pad-container.component.html',
  styleUrls: ['./pad-container.component.css']
})
export class PadContainerComponent implements OnInit, OnDestroy {

  private objectSubscription: Subscription;

  constructor(private padService: PadService) { }

  ngOnInit() {

    this.objectSubscription = this.padService.object$.subscribe( (object) => {
    });

  }

  ngOnDestroy() {
    this.objectSubscription.unsubscribe();
  }

}
