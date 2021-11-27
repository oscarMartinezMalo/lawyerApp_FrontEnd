import { Component, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('drawer') public drawer: MatSidenav;
  public toolbarColor = 'navbar-solid-color';
  urlIsHome: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(map(result => result.matches));
  afAuth: any;

  constructor(
      private breakpointObserver: BreakpointObserver,
      public authService: AuthService,      
        private scrollDispatcher: ScrollDispatcher,
        private zone: NgZone,
        private sharedService: SharedService
  ) {

    sharedService.isUrlHome$.subscribe(urlIsHome=>{
         this.urlIsHome = urlIsHome;
         if(urlIsHome) {
             this.toolbarColor = 'navbar-transparent';
         } else {
            this.toolbarColor = 'navbar-solid-color';
         }
    })
    
  this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    this.zone.run(() => { 
         this.toolbarColor = (scrollTop < 50 && this.urlIsHome ) ? 'navbar-transparent' : 'navbar-solid-color'; });
  })
   }

  // tslint:disable-next-line: use-lifecycle-interface
  public async ngOnInit() {
      this.drawerClose();
  }

  public drawerClose(): void {
      this.isHandset$.subscribe(isHandset => {
          if (isHandset) {
              this.drawer?.toggle(false);
          }
      });
  }


}
