import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegistrationResponse, IUserXs } from '../../../../../common/interfaces/iuser';
import { Global } from '../../shared/classes/global';



@Injectable({
  providedIn: 'root'
})
export class KjoinService {

  constructor(
    private http: HttpClient
  ) { }

  postUser(user:IUserXs): Observable<IUserRegistrationResponse> {
    return this.http.post<IUserRegistrationResponse>( Global.userUrl+'register/', user)
  }
}
