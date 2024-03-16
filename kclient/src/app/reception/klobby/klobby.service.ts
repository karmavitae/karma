import { Injectable } from '@angular/core';
import { IQuote } from '../../../../../common/interfaces/iquote';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../shared/classes/global';
import { Observable } from 'rxjs';
import { IS2S } from '../../../../../common/interfaces/igen';

@Injectable({
  providedIn: 'root'
})
export class KlobbyService {
  public static quotes:IQuote[] = [
    {name: "DISPLAY YOUR TALENTS IN FULL GLORY.  WHY HIDE THEM BEHIND WORDS ON YOUR CV/RESUME", color: "#F12152", img: 'assets/images/masks.png'},
    {name: "YOUR ACTIONS, BIG OR SMALL, BUILD YOUR TALENT. THE KEY IS IT'S AWARNESS.", color: "#00cc7e", img: 'assets/images/fern.png'},
    {name: "CAREERS, LIKE ALL GREAT ARCHITECTURE, ARE DESIGNED WITH THOUGHT AND PLANNING", color: "#f1c021", img: 'assets/images/arch.png'},
    {name: "WE HAVE 80,000 HOURS OF WORKING LIFE. MAKE EVERY HOUR COUNT.", color: "#21baf1", img: 'assets/images/time.png'},
   ]
   max=3
   min=0
   constructor(
    private http: HttpClient
   ) { }
 
   public getQuote():IQuote {
     let randomIndex:number = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
     return KlobbyService.quotes[randomIndex]
   }
}