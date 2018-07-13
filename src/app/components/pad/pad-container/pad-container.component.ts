import { ViewChild, ElementRef, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PadService } from '../../../services/pad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pad-container',
  templateUrl: './pad-container.component.html',
  styleUrls: ['./pad-container.component.css']
})
export class PadContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('mainPad') mainPadRef: ElementRef;

  private objectSubscription: Subscription;

  constructor(private padService: PadService) { }

  ngOnInit() {
    console.log('PadContainer ngOnInit()');
  }

  ngAfterViewInit() {
    console.log('PadContainer ngAfterViewInit()');

    this.objectSubscription = this.padService.object$.subscribe( (object) => {

      if (object) {
        object.node('pads.main').attachToDOM(this.mainPadRef.nativeElement);
      } else {
        // TODO clear view
      }

    });

  }

  ngOnDestroy() {
    console.log('PadContainer ngOnDestroy()');
    this.objectSubscription.unsubscribe();
  }

}
