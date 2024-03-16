import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

 
  isDarkMode!:BehaviorSubject<boolean>

  renderer!:Renderer2
  isCurrentModeDark!: boolean
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory$: RendererFactory2
  ) { 
    this.renderer = this.rendererFactory$.createRenderer(null, null);
    if(isPlatformBrowser(platformId)) { this.themeListener()}
    else {this.isDarkMode = new BehaviorSubject(false)}
  }

  getActiveTheme(): Observable<boolean> {
    return this.isDarkMode.asObservable()
  }

  toggleTheme() {
    this.isCurrentModeDark = !this.isCurrentModeDark
    this.isDarkMode.next(this.isCurrentModeDark)
    this.updateTheme()
  }

  updateTheme() {
    let oldTheme = this.isCurrentModeDark ? 'light-theme' : 'dark-theme'
    let newTheme = this.isCurrentModeDark ? 'dark-theme' : 'light-theme'
    this.renderer.removeClass(document.body, oldTheme)
    this.renderer.addClass(document.body, newTheme)
  }

  themeListener() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.isCurrentModeDark = darkModeQuery.matches
    this.isDarkMode = new BehaviorSubject(this.isCurrentModeDark)
    this.updateTheme()
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', (event)=>{
        this.isCurrentModeDark = event.matches
        this.isDarkMode.next(this.isCurrentModeDark)
        this.updateTheme()
      })
    } 
  }
}