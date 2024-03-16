import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  
  isMobile!:BehaviorSubject<boolean>
  constructor(
    private bos$: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    this.isMobile = new BehaviorSubject(false)
    if(isPlatformBrowser(this.platformId)) { this.checkIsMobile()}
    else{ this.isMobile = new BehaviorSubject(true)}
  }

  checkIsMobile(): Observable<boolean> {
    return new Observable((observer) => {
        this.bos$.observe([ Breakpoints.Small, Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
        .subscribe(result => { 
          observer.next(result.matches)
          this.isMobile.next(result.matches) 
        });
      })
  }
}
