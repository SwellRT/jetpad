import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare let window: any;
declare let document: any;

if (environment.production) {
  enableProdMode();
}


// _lh is an array of handlers to call after swellRT js client is ready
// this ensures that app starts iff swellrt is available.
window._lh = [
  function(swellApi) {
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
 } ];

 // load the swellRT script
const scriptTag: any = document.createElement('script');
scriptTag.setAttribute('type', 'text/javascript');
scriptTag.setAttribute('src', environment.swellrt.url);
scriptTag.setAttribute('async', true);

const bodyTag = document.getElementsByTagName('body')[0];
bodyTag.appendChild(scriptTag);
