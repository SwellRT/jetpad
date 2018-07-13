import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';


declare let swell: any;

@Injectable({
  providedIn: 'root'
})
export class SwellService  {

  private defaultSwellDomain = 'local.net'; // TODO define as environment property

  private api: any = swell.runtime.get();

  /** nullable, hot */
  session$ = new BehaviorSubject<any>(null);

  /** hot */
  status$ = new BehaviorSubject<string>(swell.Constants.STATUS_DISCONNECTED);
  statusError = null;

  object: any; // the current object

  constructor(private snackBar: MatSnackBar) {
    this.updateSessionSubject();

    this.api.addConnectionHandler((status, err) => {
      this.status$.next(status);
      this.statusError = err;
      console.log('Swell status ' + status);
      if (err) {
        console.log(err);
      }
    });

  }

  getSwellDomain() {
    try {
      return this.api.getAppDomain();
    } catch {
      return this.defaultSwellDomain;
    }
  }

  /**
   * Start a non anonymous session
   *
   * @param userid
   * @param password
   */
  startSession(userid, password) {

    return this.api.login({
      id: userid,
      password: password
    })
    .then( profile => {
      this.snackBar.open('Login success for ' + profile.id, 'Close', { duration: 3000 });
      return profile.id;
    }).catch(err => {
      this.snackBar.open('Login error', 'Close', { duration: 3000 });
    })
    .finally( () => {
      this.updateSessionSubject();
    });

  }

  /**
   * End current session iff is not anonymous
   */
  endSession() {

    if (this.api.profilesManager.getCurrentParticipantId() &&
        !this.api.profilesManager.getCurrentProfile().anonymous) {

      return this.api.logout({
        id: this.api.profilesManager.getCurrentParticipantId().address
      }).finally(() => {
        this.updateSessionSubject();
      });

    } else {
      return Promise.resolve();
    }

  }

  /**
   * Re-start last session saved in browser
   */
  resumeSession() {

    return this.api.resume({})
    .then( profile => {
    })
    .catch( err => {
      return this.api.login({});
    })
    .finally(() => {
      this.updateSessionSubject();
    });

  }

  /**
   * Create user account
   *
   * @param userid
   * @param password
   * @param properties
   */
  createUser(userid, password, properties) {
    return this.api.createUser({
        id: userid,
        password: password
      })
    .then(profile => {
      this.snackBar.open('Account created for ' + profile.id, 'Close', { duration: 3000 });
    })
    .catch(err => {
      this.snackBar.open('Error creating account', 'Close', { duration: 3000 });
    });
  }


  getObject(objectId) {

    // TODO check id syntax
    return this.api.open({
      id: objectId
    })
    .then( object => {

      // TODO define  meaningful object states for the app
      if (!object.node('state')) {
        object.set('state', '_created_');

        if (this.api.profilesManager.getCurrentProfile().anonymous) {
          object.setPublic(true);
        }
      }
      return object;
    });
  }


  /**
   * Propagate session info
   */
  private updateSessionSubject() {

    if (this.api.profilesManager.getCurrentParticipantId())  {
      this.session$.next({
        id: this.api.profilesManager.getCurrentSessionId(),
        profile: this.api.profilesManager.getCurrentProfile(),
        registered: !this.api.profilesManager.getCurrentProfile().anonymous
      });
    } else {
      this.session$.next(null);
    }


  }

}
