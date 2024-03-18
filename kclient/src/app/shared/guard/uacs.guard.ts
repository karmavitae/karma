import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UacsGuard implements CanLoad {
  constructor(
    private router:Router,
    private us:UserService){
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.us.userType===0){
        return true
      }else{
        this.router.navigateByUrl('');
        return false;
      }
  }
}
