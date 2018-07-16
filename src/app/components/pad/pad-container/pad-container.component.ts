import { ChangeDetectorRef, ViewChild, ElementRef, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { PadService } from '../../../services/pad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pad-container',
  templateUrl: './pad-container.component.html',
  styleUrls: ['./pad-container.component.css']
})
export class PadContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('mainPad') mainPadRef: ElementRef;

  private drawerLayoutDef = {

    lg: {
      left: {
        opened: true,
        },
      right: {
          opened: true,
        },
      mode: 'side',
      width: '300px'
    },

    md: {
      left: {
        opened: false
        },
      right: {
          opened: false,
        },
      mode: 'over',
      width: '300px'
    },

    sm: {
      left: {
        opened: false
        },
      right: {
        opened: false,
        },
      mode: 'over',
      width: '90%'
    }

  };


  private contentLayoutDef = {

    lg: {
      class: 'pad-content-lg'
    },

    md: {
      class: 'pad-content-md'
    },

    sm: {
      class: 'pad-content-sm'
    }

  };

  private objectSubscription: Subscription;

  private smMediaQueryString = '(max-width: 800px)';
  private mdMediaQueryString = '(max-width: 1400px)';

  private smMediaQueryList: MediaQueryList;
  private mdMediaQueryList: MediaQueryList;

  media = 'lg';

  drawerLayout: any = this.drawerLayoutDef.lg;
  contentLayout: any = this.contentLayoutDef.lg;
  showFooter = true;


  /**
   * default = standar options of a pad
   * selection = contextual options for selected text
   */
  bottomMenu = 'default';

  constructor(
    private padService: PadService,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher) {

      this.smMediaQueryList = this.mediaMatcher.matchMedia(this.smMediaQueryString);
      this.smMediaQueryList.addListener(() => { this.refreshLayout(); });

      this.mdMediaQueryList = this.mediaMatcher.matchMedia(this.mdMediaQueryString);
      this.mdMediaQueryList.addListener(() => { this.refreshLayout(); });
    }

  private refreshLayout() {
    console.log('refreshing layout');
    if (!this.smMediaQueryList.matches &&
        !this.mdMediaQueryList.matches) {
        this.media = 'lg';
    } else if (this.smMediaQueryList.matches) {
        this.media = 'sm';
    } else if (this.mdMediaQueryList.matches) {
        this.media = 'md';
    }

    this.contentLayout = this.contentLayoutDef[this.media];
    this.drawerLayout = this.drawerLayoutDef[this.media];

  }

  ngOnInit() {
    this.refreshLayout();
  }

  ngAfterViewInit() {

    this.objectSubscription = this.padService.object$.subscribe( (object) => {

      if (object) {
        this.padService.editor.set(object.node('pads.main'));
        this.padService.editor.attachToDOM(this.mainPadRef.nativeElement);
        this.padService.editor.edit(true);
      } else {
        this.padService.editor.clean();
      }

    });

    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.objectSubscription.unsubscribe();
  }



  private toggleRightDrawer(show: boolean) {
    this.drawerLayout.right.opened = show;
  }

  private toggleLeftDrawer(show: boolean) {
    this.drawerLayout.left.opened = show;
  }

  showOutline() {
    this.toggleLeftDrawer(true);
    // this.showFooter = false;
  }


  showComments() {
    this.toggleRightDrawer(true);
    // this.showFooter = false;
  }

}
