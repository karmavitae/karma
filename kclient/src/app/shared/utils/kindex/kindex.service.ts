import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IS2S } from '../../../../../../common/interfaces/igen';
import { KspinnerService } from '../kspinner/kspinner.service';

export interface IDisplayColumns {
  [key:string] : IS2S
}

export interface IIndexItem {
  [key:string]: string|number
}

@Injectable({
  providedIn: 'root'
})
export class KindexService {



  static indexMetadata:any = {
    'User' : {
      displayColumns: {'actions' : 'Action', 'email' : 'Email', 'first_name' : 'First Name', 'last_name' : 'Last Name', 'status' : 'Status', 'user_type': 'Type'},
      searchColumns: {'email' : 'Email', 'first_name' : 'First Name', 'last_name' : 'Last Name'},
    }, 
    'Job' : {
      displayColumns: {'actions' : 'Action', 'title' : 'Title', 'employer_name' : 'Employer', 'city' : 'City', 'status' : 'Status', 'experience_length': 'Experience'},
      searchColumns: {'title' : 'Job Title', 'employer_name' : 'Employer', 'city' : 'City'},
    }, 
    'Recruiter' : {
      displayColumns: {'actions' : 'Action', 'name' : 'Name', 'designation' : 'Designation', 'department' : 'Department', 'status' : 'Status', 'role': 'Role'},
      searchColumns: {'name' : 'Name', 'designation' : 'Designation', 'role' : 'Role'},
    }, 
    'Aspirant' : {
      displayColumns: {'actions' : 'Action', 'name' : 'Name', 'hours' : 'Experience', 'status' : 'Status'},
      searchColumns: {'name' : 'Name'},
    }, 
    'Department' : {
      displayColumns: {'actions' : 'Action', 'department_name' : 'Name'},
      searchColumns: {'department_name' : 'Name'},
    }, 

  }

  static dispalyColumns:IDisplayColumns = {
    'user' : {'actions' : 'Action', 'email' : 'Email', 'first_name' : 'First Name', 'last_name' : 'Last Name', 'status' : 'Status', 'user_type': 'Type'},
    'aspirant' : {},
    'candidate' : {},
    'employee' : {},
    'consultant' : {},
    'jobs' : {},
    'recruiter' : {},
    'department' : {},
    'organization' : {} 
  }

  constructor(
    private http: HttpClient,
    private kspinner$: KspinnerService
  ) { }

  getDisplayColumns(karmaObject:string): IS2S {
    return  KindexService.indexMetadata[karmaObject]['displayColumns']
  }

  getSearchColumns(karmaObject:string): IS2S {
    return  KindexService.indexMetadata[karmaObject]['searchColumns']
  }

  getDisplayData(karmaObject:string, skip:number, count:number, sortKey:string): Observable<IIndexItem[]> {
    const params = { params: new HttpParams().set('collection', karmaObject).set('skip', skip).set('count', count).set('sortKey', sortKey)}
    return this.http.get<any>('obj', params).pipe(tap((res)=>{})).pipe(tap(()=>{
      this.kspinner$.hideSpinner()
    }))
  }
}
