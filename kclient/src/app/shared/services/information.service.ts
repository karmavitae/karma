import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of } from 'rxjs';
import { IArticle } from '../../../../../common/interfaces/iarticle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Global } from '../classes/global';
import { KspinnerService } from '../utils/kspinner/kspinner.service';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(
    private http: HttpClient,
    private kspinner$: KspinnerService
  ) { }

  getArticle(articleFor:string): Observable<IArticle> {
    this.kspinner$.showSpinner()
    const params = new HttpParams().set('informationFor', articleFor)
    return this.http.get<IArticle>( Global.infoUrl, {params}).pipe(
      delay(1000), catchError(()=> {return of({} as IArticle)}))
  }

}

