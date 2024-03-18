import { Injectable } from '@angular/core';
import { Observable, delay, of, timeout } from 'rxjs';
import { KspinnerService } from '../../shared/utils/kspinner/kspinner.service';

@Injectable({
  providedIn: 'root'
})
export class KvpService {

  kp = {
    journeys: { learning: [], cpd: [], voluntary: [] },
    talent_matrix: { GM: 6, MA: 2, SP: 1, EX:19, AD: 1, BE: 18, TR: 20, "-": 49 },
    isEnable: true, 
    hours: {'Total' : 5000, 'Work': 3000, 'Learning' : 1000, 'Voluntary' : 1000},
    potential: [
      {name: 'One', score: 350},
      {name: 'Two', score:200 },
      {name: 'Three', score: 299 },
      {name: 'Four', score: 80},
      {name: 'Five', score:266 },
      {name: 'Six', score: 150 },
    ],
    abilities: [
      {name: 'One', score: 50},
      {name: 'Two', score:200 },
      {name: 'Three', score: 209 },
      {name: 'Four', score: 80},
      {name: 'Five', score:266 },
      {name: 'Six', score: 150 },
    ],
    personalities: [
      {name: 'One', score: 35},
      {name: 'Two', score:20 },
      {name: 'Three', score: 29 },
      {name: 'Four', score: 8},
      {name: 'Five', score:26 },
      {name: 'Six', score: 10 },
    ],

  }

  profile:Observable<any> = of(this.kp)
  constructor(
    private kspinner$: KspinnerService
  ) { }

  getKv(): Observable<any> {
    this.kspinner$.showSpinner()
    return this.profile.pipe(delay(1000))
   
  }

}
