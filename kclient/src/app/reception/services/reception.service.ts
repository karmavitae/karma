import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult, IS2S } from '../../../../../common/interfaces/igen';
import { Global } from '../../shared/classes/global';
import { IUserXsResult } from '../../../../../common/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(
    private http: HttpClient,
  ) { }

  recover(credentials:IS2S):Observable<IResult> {
    return this.http.post<IResult>(Global.userUrl +'recover', credentials)
  } 

  activate(credentials:IS2S):Observable<IResult> {
    return this.http.post<IResult>(Global.userUrl +'activate', credentials)
  } 

  getActivationData(data:IS2S): Observable<IUserXsResult> {
    const params = new HttpParams().set('email', data['email']).set('activationCode', data['activationCode'])
    return this.http.get<IUserXsResult>( Global.userUrl+'activate', {params})
  }

  reset(credentials:IS2S):Observable<IResult> {
    console.log('called')
    return this.http.post<IResult>(Global.userUrl +'reset', credentials)
  } 

  parseUrl(url:string): IS2S {
    let data = url.split('/')
    if(Object.keys(data).length > 0){
      switch(data.length){
        case 4:
          return { activationCode: data[data.length-2], email: data[data.length-1], postId: '' }
        case 5:
          return { activationCode: data[data.length-2], email: data[data.length-1], postId: data[data.length-3]  }
        default:
          return {}
      }
    }else{
      return {}
    }
  }

}