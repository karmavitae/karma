import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IMenuFrame, IMenu } from '../../../../../common/interfaces/imenu';
import { BehaviorSubject, Observable } from 'rxjs';
import { CacheService } from './cache.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  defaultMenu:IMenuFrame = {
    menus: [
      { name: 'Sign in', link: 'login', contextMenu: []},
      { name: 'Join', link: 'join', contextMenu: []},
    ],
    actions: {} as IMenu
  }
  kframeMenu!:BehaviorSubject<IMenuFrame>
  activeMenu!:BehaviorSubject<IMenu>
  defaultLink!:string

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cache$: CacheService
  ) {
    this.defaultLink = ''
    this.kframeMenu = new BehaviorSubject(this.loadMenu())
    this.getDefaultActiveMenu()
  }

  getMenu():Observable<IMenuFrame> {
    return this.kframeMenu.asObservable()
  }

  refreshMenu(): void {
    this.updateMenu(this.loadMenu())
  }


  loadMenu(): IMenuFrame {
    let menuFrame = {} as IMenuFrame
    if(isPlatformBrowser(this.platformId)){
      let data:IMenuFrame = this.cache$.getItem('menus')
      if(Object.keys(data).length > 0) {
        menuFrame = data
      }
    }
    return Object.keys(menuFrame).length > 0 ? menuFrame : this.defaultMenu
  } 

  updateMenu(updatedMenu:IMenuFrame):void {
    this.kframeMenu.next(updatedMenu)
    if(updatedMenu.menus){
      let activeMenu = updatedMenu.menus.find(item=>item.isActive)
      this.defaultLink = activeMenu?.link || ''
      if(activeMenu) {  this.setActiveMenu(activeMenu)} 
    }
  }

  getActiveMenu():Observable<IMenu> {
    return this.activeMenu.asObservable()
  }

  setActiveMenu(activeMenu:IMenu) {
    if(Object.keys(activeMenu).length > 0) {
      this.deactivateMenu()
      activeMenu.isActive = true
      this.activeMenu.next(activeMenu)
    }
  }

  private getDefaultActiveMenu(){
    let defaultMenu = this.defaultMenu.menus.find(element=>element.link === 'kvp')
    this.activeMenu = new BehaviorSubject(defaultMenu ? defaultMenu : {name: '', link: '', contextMenu: []} as IMenu)
  }

  private deactivateMenu(): void {
    let menuToDeactivate = this.kframeMenu?.value
    menuToDeactivate.menus?.forEach(item=>item.isActive=false)
    this.defaultMenu.menus.forEach(item=> item.isActive = false)
  }


  
}
