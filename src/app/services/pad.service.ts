import { Injectable } from '@angular/core';
import { SwellService } from './swell.service';
import { Subject, Subscription } from 'rxjs';
import { take, first } from 'rxjs/operators';

declare let swell: any;
declare let window: any; // TODO remove, just for hacking debug

@Injectable({
  providedIn: 'root'
})
export class PadService {

  private session;

  /** swell's text editor instance. To be used from UI componentes.  */
  editor: any;

  /** null values, cold */
  object$ = new Subject<any>();
  object: any;

  constructor(private swellService: SwellService) {
    console.log('PadService constructor()');

    swell.Editor.configure({
      traceUserAgent: true
      // caretFactory: function() { return new Caret(); }
    });
    this.editor = swell.Editor.create();
  }

  /**
   * Initialize the service state with a new object. This method
   * waits until the Swell service is ready.
   *
   * This method is meant to be called when the view
   * is initialized.
   *
   * Changes in the swell session are not detected by the service,
   * they are not supossed to happen within the views working
   * with this service. Hence, changes in session would happen
   * after destroying the view and cleaning the service.
   *
   * @param objectId
   */
  init(objectId) {

    if (this.editor.hasDocument()) {
      this.editor.clean();
    }

    if (this.session) {
      this.loadObject(objectId);
    } else {
      // we must wait for the swell session
      this.swellService.session$.pipe(first( val => val != null))
      .subscribe(session => {
          this.session = session;
          this.loadObject(objectId);
      });

    }

  }

  /**
   * Cleans up the service state.
   *
   * This method is meant to be called when the view
   * is destroyed.
   */
  clean() {
  }


  /**
   * Internal method that actually loads the swell object and performs
   * intializations tasks on it.
   *
   * @param objectId
   */
  private loadObject(objectId) {

    return this.swellService.getObject(objectId)
    .then( object => {

      window._object = object; // TODO remove

      if (!object.node('pads'))  {
        object.set('pads', swell.Map.create());
        object.node('pads').put('main', swell.Text.create('Some text added by default!'));
      }

      this.object = object;
      this.object$.next(this.object);
    });

  }


}
