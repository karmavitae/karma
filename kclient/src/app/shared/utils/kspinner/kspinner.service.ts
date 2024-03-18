import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KspinnerService {
  private loader = new BehaviorSubject<boolean>(false);
  public isLoading = this.loader.asObservable();

  constructor() { }
  showSpinner() {
    this.toogleLoader(true);
  }

  hideSpinner() {
    this.toogleLoader(false);
  }

  private toogleLoader(flag: boolean) {
    this.loader.next(flag);
  }
}
