import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwellService } from '../../services/swell.service';
import { switchMap, filter } from 'rxjs/operators';
import { PadService } from '../../services/pad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit, OnDestroy, AfterViewInit {


  private objectSubscription: Subscription;
  object: any;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private padService: PadService) {}

  ngOnInit() {
    console.log('Pad ngOnInit()');
    this.objectSubscription = this.padService.object$.subscribe( (object) => {
      this.object = object;
    });

    this.route.paramMap.subscribe( params => {
      this.name = params.get('name');
      this.padService.init(this.name);
    });
  }

  ngAfterViewInit() {
    console.log('Pad ngAfterViewInit()');
  }

  ngOnDestroy() {
    console.log('Pad ngOnDestroy()');
    this.objectSubscription.unsubscribe();
  }

}
