import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IMenuFrame, IMenu, IContextMenuItem } from '../../../../../common/interfaces/imenu';
import { BehaviorSubject, Observable, elementAt } from 'rxjs';
import { CacheService } from './cache.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

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
  contextMenu!:BehaviorSubject<IContextMenuItem>

  constructor(
    private cache$: CacheService
  ) {
    this.defaultLink = ''
    this.kframeMenu = new BehaviorSubject(this.loadMenu())
    this.getDefaultActiveMenu()
  }

  isUserLoggedIn(): boolean {
    const token = this.cache$.getItem('uls');
    return Object.keys(token).length > 0 ? true : false
  }

  getMenu():Observable<IMenuFrame> {
    return this.kframeMenu.asObservable()
  }

  refreshMenu(): void {
    this.updateMenu(this.loadMenu())
  }


  loadMenu(): IMenuFrame {
    let menuFrame = {} as IMenuFrame
    let data:IMenuFrame = this.cache$.getItem('menus')
    if(Object.keys(data).length > 0) {
      menuFrame = data
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
    this.cache$.removeItem('activeMenu')
    this.deactivateMenu()
    if(Object.keys(activeMenu).length>0) {activeMenu.isActive = true}
    this.activeMenu.next(activeMenu)
    this.cache$.setItem('activeMenu', activeMenu)
  }

  setActiveMenuItem(activeMenuItem:IContextMenuItem) {
    this.cache$.setItem('activeItem', activeMenuItem)
  }
  getActiveMenuItem(): IContextMenuItem {
    let item = this.cache$.getItem('activeItem')
    return item ? item : {} as IContextMenuItem

  }

  private getDefaultActiveMenu(){
    let currentActiveMenu:IMenu = this.fetchActiveMenu() 
    if(Object.keys(currentActiveMenu).length>0){
      let defaultMenu = currentActiveMenu
      this.activeMenu = new BehaviorSubject(defaultMenu ? defaultMenu : {name: '', link: '', contextMenu: []} as IMenu)
    }
    else {
      let defaultMenu = this.defaultMenu.menus.find(element=>element.link === 'kvp')
      this.activeMenu = new BehaviorSubject(defaultMenu ? defaultMenu : {name: '', link: '', contextMenu: []} as IMenu)
    } 

  }

  private deactivateMenu(): void {
    let menuToDeactivate = this.kframeMenu?.value
    menuToDeactivate.menus?.forEach(item=>item.isActive=false)
    this.defaultMenu.menus.forEach(item=> item.isActive = false)
  }


  private fetchActiveMenu(): IMenu {
    let activeMenu = {} as IMenu
    let data:IMenu = this.cache$.getItem('activeMenu')
    if(Object.keys(data).length > 0) {
      activeMenu = data
    }
    return activeMenu
  }

  findAndSetActiveMenu(link:string) {
    let activeMenu = {} as IMenu
    let activeItem = {} as IContextMenuItem
    let fdn = link.split('/').filter(item=>item)
    if(fdn.length>0){
      activeMenu = this.kframeMenu.value.menus.find( element => element.link === fdn[0]) || {} as IMenu
      if(fdn.length > 1 && activeMenu?.contextMenu && activeMenu.contextMenu.length > 0) {
        activeMenu.contextMenu.forEach(item=>{ 
          if(Object.keys(activeItem).length === 0){
            if(item.link.includes(fdn[1])) {
              activeItem = item
            }else {
              if(item.sub && item.sub.length>0){
                activeItem =   item.sub.find(i=> i.link.includes(fdn[1])) || {} as IContextMenuItem
              }
            }
          }
        })
      }
    }   
    this.setActiveMenuItem(activeItem)
    this.setActiveMenu(activeMenu)
  }


  
}
