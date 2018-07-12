import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PadComponent implements OnInit, OnDestroy {

  private sessionSubscription: Subscription;
  session: any;

  private objectSubscription: Subscription;
  object: any;

  objectId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private padService: PadService,
    private swellService: SwellService) {}

  ngOnInit() {

    this.objectSubscription = this.padService.object$.subscribe( (object) => {
      this.object = object;
    });

    // we init the pad service with the object id param iff session is ready.
    let id: string;
    this.sessionSubscription = this.route.paramMap.pipe( switchMap( (params: ParamMap) => {

      id = params.get('id');
      return this.swellService.session$;

    })).subscribe( session => {

        if (session) {
          this.session = session;
          this.padService.init(id);
        }

    });

  }

  ngOnDestroy() {
    this.objectSubscription.unsubscribe();
    this.sessionSubscription.unsubscribe();
  }

}
