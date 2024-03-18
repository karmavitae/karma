import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  storageType!:number
  passPhrase!:string

  constructor() {
    this.storageType = 2
   }

  setItem(name:string, data:any):void {
    switch (this.storageType) {
      case 1:
        localStorage.setItem(name, JSON.stringify(data))
        break;
      case 2:
        sessionStorage.setItem(name, JSON.stringify(data))
        break
      default:
        sessionStorage.setItem(name, JSON.stringify(data))
        break;
    }
  }
  getItem(name:string):any{
    let rawData:string
    switch (this.storageType) {
      case 1:
        rawData = localStorage.getItem(name) || ''
        break;
      case 2:
        rawData = sessionStorage.getItem(name) || ''
        break
      default:
        rawData = sessionStorage.getItem(name) || ''
        break;
    }
    if(rawData.length > 0) {
      return JSON.parse(rawData)
    }else {
      return {}
    }
  }

  removeItem(name:string):void {
    switch (this.storageType) {
      case 1:
       localStorage.removeItem(name) 
        break;
      case 2:
        sessionStorage.removeItem(name) 
        break
      default:
        sessionStorage.removeItem(name) 
        break;
    }
  }

  clearCache(storageType:number | null):void {
    switch (storageType) {
      case 1:
       localStorage.clear()
        break;
      case 2:
        sessionStorage.clear() 
        break
      default:
        sessionStorage.clear()
        localStorage.clear()
        break;
    }
  }

  encr(data:string):string {
    return ''
  }
  decr(data:string):string {
    return ''
  }
}
