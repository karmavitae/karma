import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostBinding, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subscription, debounceTime, fromEvent, throttleTime } from 'rxjs';

@Directive({
  selector: '[dynamicHeight]',
  standalone: true
})
export class DynamicHeightDirective {

  @Input() minHeight!: number;
  @Input('dynamicHeight') topOffset!: number;
  @HostBinding('style.overflow-y') overflowY = 'auto';

  private domElement!: HTMLElement;
  private subscription!: Subscription;

  constructor(
     private renderer: Renderer2, 
     private elementRef: ElementRef,
     @Inject(PLATFORM_ID) private platformId: Object
     ) {
      if(isPlatformBrowser(this.platformId)) {
        this.domElement = this.elementRef.nativeElement as HTMLElement;
        this.subscription = fromEvent(window, 'resize')
          .pipe(throttleTime(500), debounceTime(500))
          .subscribe(() => this.setHeight());
      }
    
   }
  
  ngAfterViewInit(): void {
    this.setHeight()
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  private setHeight() {
    if(isPlatformBrowser(this.platformId)) {
      const windowHeight = window?.innerHeight;
      const topOffset = this.topOffset || this.calcTopOffset();
      let height = windowHeight - topOffset;

      if (this.minHeight && height < this.minHeight) {
        height = this.minHeight;
      }
      this.renderer.setStyle(this.domElement, 'height', `${height}px`);
    }
  }

  private calcTopOffset(): number {
    try {
      const rect = this.domElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }

}
