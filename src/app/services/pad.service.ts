import { Injectable } from '@angular/core';
import { SwellService } from './swell.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PadService {

  object$ = new Subject<any>();

  constructor(private swellService: SwellService) { }

  /**
   * Initialize a pad editor session
   * @param objectId
   */
  init(objectId) {
    this.swellService.getObject(objectId)
    .then( object => {
      this.object$.next(object);
    })
    .catch( err => {
      console.log('PadService init error ' + err);
    });
    return objectId;
  }

  /**
   * finalize a pad editor session
   */
  finalize() {
  }
}
