import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatTreeModule } from '@angular/material/tree'
import { Observable, Subscription } from 'rxjs';
import { IContextMenuItem, IMenu } from '../../../../../../common/interfaces/imenu';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { DynamicHeightDirective } from '../../directives/dynamic-height.directive';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { KfooterComponent } from '../kfooter/kfooter.component';
import { MatListModule } from '@angular/material/list' 
import { ResponsiveService } from '../../services/responsive.service';
import { UserService } from '../../services/user.service';
import { ThemeService } from '../../services/theme.service';
// import { KframeService } from '../kframe.service';

@Component({
  selector: 'app-kcontext-menu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    NgClass,
    MatIconModule,
    MatTreeModule,
    AsyncPipe,
    DynamicHeightDirective,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    KfooterComponent,
  ],
  templateUrl: './kcontext-menu.component.html',
  styleUrl: './kcontext-menu.component.scss'
})

export class KcontextMenuComponent implements OnInit, OnDestroy{
  @Input('activeMenu') activeMenu!:IMenu
  @Input('activeItem') activeItem!:IContextMenuItem
  // @Input('activeItemName') activeItemName!:string

  

  isLarge!:boolean
  menuTitle!:string
  isDrawerOpened!:boolean
  isMobile!:Observable<boolean>  
  isDarkMode!:Observable<boolean>
  showContent!:boolean
  isEnable!:boolean

  subscription!:Subscription

  treeControl = new NestedTreeControl<IContextMenuItem>(node => node.sub);
  dataSource = new MatTreeNestedDataSource<IContextMenuItem>();
  data!:IContextMenuItem[]

  constructor(
    private responsive$: ResponsiveService,
    private theme$: ThemeService,
    private router: Router,
    private user$: UserService,
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.isDarkMode = this.theme$.getActiveTheme()
    this.isLarge=true
  }
  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.user$.getActiveMenu().subscribe({
      next: (response) => {
        if(Object.keys(response).length>0){
          this.activeMenu = response
          this.dataSource.data = this.activeMenu.contextMenu
          this.activeItem = this.user$.getActiveMenuItem()
          if(this.activeMenu.contextMenu.length>0) {this.isEnable = true} else { this.isEnable=false}
        }else {
          this.isEnable = false
          this.dataSource.data = []
          this.activeItem= {} as IContextMenuItem
        }
        
      }
    })
  }

  hasChild = (_: number, node: IContextMenuItem) => !!node.sub && node.sub.length > 0;

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened
  }  

  onMenuSelected(item:IContextMenuItem) {
    this.navigate(item.link)
  }


  navigate(link:string) {
    this.router.navigate([link])
  }

  findActiveItem() {
    let result:IContextMenuItem = {} as IContextMenuItem
    this.activeMenu.contextMenu.forEach(element=>{
      if(element.sub && element.sub.length > 0) {
        const match = element.sub.find(element => element.name === this.activeItem.name)
        if(match) { 
          result = match
          this.treeControl.expand(element)
        }
      }
    })
    return result
  }

}
