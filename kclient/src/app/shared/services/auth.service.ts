import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IS2S } from '../../../../../common/interfaces/igen';
import { Observable, tap } from 'rxjs';
import { Global } from '../classes/global';
import { CacheService } from './cache.service';
import { UserService } from './user.service';
import { ILoginResult } from '../../../../../common/interfaces/ilogin'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cache$: CacheService,
    private user$: UserService,
  ) { }

  login(credentials:IS2S):Observable<ILoginResult> {
    return this.http.post<ILoginResult>(Global.authUrl+'login', credentials).pipe(
      tap((response:ILoginResult)=>{
        if(response.status === 200) {
          this.cache$.setItem('menus', response.data)
          this.cache$.setItem('uls', '1')
          this.user$.updateMenu(response.data)
        }
      })
    )
  } 

  logout(): Observable<IS2S> {
    return this.http.post<IS2S>(Global.authUrl+'logout', {}).pipe(
      tap((response:IS2S)=>{
        if(response['isLoggedOut']==='true'){
          this.cache$.clearCache(null)
          this.cache$.removeItem('uls')
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