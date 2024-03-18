import { Component, Input } from '@angular/core';
import { Global } from '../../classes/global';

@Component({
  selector: 'app-kstatus',
  standalone: true,
  imports: [],
  templateUrl: './kstatus.component.html',
  styleUrl: './kstatus.component.scss'
})
export class KstatusComponent {

  @Input('hours') hours!: number
  s!: any
  karmaStatus = Global.levels

  constructor() { }

  ngOnInit(): void {
    this.setValue()    
  }

  setValue(){
    var level = ""
    if(this.hours >=30000){
      level = 'GM'
    } else if (this.hours>= 20000 && this.hours < 30000){
      level = "MA"
    } else if (this.hours>= 10000 && this.hours < 20000){
      level = "SP"
    } else if (this.hours>= 5000 && this.hours < 10000){
      level = "EX"
    } else if (this.hours>= 1000 && this.hours < 5000){
      level = "AD"
    } else if (this.hours>= 500 && this.hours < 1000){
      level = "BE"
    } else if (this.hours> 0 && this.hours < 500){
      level = "TR"
    } else {
      level = '~'
    }
    this.karmaStatus.forEach(item => {
      if(item.id == level){
        this.s = item
      }})
  }

  inRange(x:number, min: number, max:number) {
    return ((x-min)*(x-max) <= 0);
}

}
