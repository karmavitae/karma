import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Observable, Subscription, filter } from 'rxjs'
import { AsyncPipe, Location } from '@angular/common';
import { IMenuFrame, IMenu } from '../../../../../../common/interfaces/imenu'
import { ThemeService } from '../../services/theme.service';
import { MatMenuModule } from '@angular/material/menu'
import { NavigationEnd, ResolveEnd, Router, RouterLink } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service'
import { UserService } from '../../services/user.service'
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { IS2S } from '../../../../../../common/interfaces/igen';

@Component({
  selector: 'app-kmenu',
  standalone: true,

  imports: [
   MatToolbarModule,
   MatButtonModule,
   MatIconModule,
   MatMenuModule,
   RouterLink,
   AsyncPipe,
   MatDividerModule
  ],
  templateUrl: './kmenu.component.html',
  styleUrl: './kmenu.component.scss'
})
export class KmenuComponent implements OnInit, OnDestroy{
  @Output('onMenuSelection') onMenuSelection: EventEmitter<IMenu> = new EventEmitter()

  kframe!:Observable<IMenuFrame>
  actionMenu!:Observable<IMenu[]>
  isMobile!:Observable<boolean>
  isDarkMode!:Observable<boolean>
  subscription!:Subscription

  constructor(
    private router: Router,
    private user$: UserService,
    private theme$: ThemeService,
    private responsive$: ResponsiveService,
    private auth$: AuthService,
  ) {
  }
  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){ 
        this.user$.findAndSetActiveMenu(routerData.url)
    } 
})
      this.kframe = this.user$.getMenu()
      this.isDarkMode = this.theme$.getActiveTheme()
      this.isMobile = this.responsive$.checkIsMobile()
  }

  toggleTheme() {
    this.theme$.toggleTheme()
  }

  onSelection(menu:IMenu){
    this.router.navigate([menu.link])
  }

  onAction(item:any) {
    if(item.link === 'logout') {
      this.subscription = this.auth$.logout().subscribe({
        next: (response:IS2S) => {
          if(response){
            this.router.navigate([''])
          }},
        error: (e) => {console.log(e)}
      })
    }


  }

  goHome() {
    this.onSelection({name: 'home', link: '/', contextMenu: []})
  }

  disableMenu(index:number) {}

}
