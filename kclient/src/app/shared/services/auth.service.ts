import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IS2S } from '../../../../../common/interfaces/igen';
import { Observable, tap } from 'rxjs';
import { IMenuFrame } from '../../../../../common/interfaces/imenu';
import { Global } from '../classes/global';
import { CacheService } from './cache.service';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cache$: CacheService,
    private user$: UserService,
  ) { }

  login(credentials:IS2S):Observable<IMenuFrame> {
    return this.http.post<IMenuFrame>(Global.authUrl+'login', credentials).pipe(
      tap((response:IMenuFrame)=>{
        this.cache$.setItem('menus', response)
        this.user$.updateMenu(response)
      })
    )
  } 

  logout(): Observable<IS2S> {
    return this.http.post<IS2S>(Global.authUrl+'logout', {}).pipe(
      tap((response:IS2S)=>{
        if(response['isLoggedOut']==='true'){
          this.cache$.removeItem('menus')
          this.user$.refreshMenu()
        }
      })
    )
  }

  valid():Observable<IS2S> {
    return this.http.get<IS2S>(Global.authUrl+'valid').pipe(
      tap((response:IS2S)=>{
        if(response['isValid']==='false') {
        }
      })
    )
  }

}