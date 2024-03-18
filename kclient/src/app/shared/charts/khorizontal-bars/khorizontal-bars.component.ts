import { Component, Input } from '@angular/core';
import { IS2N } from '../../../../../../common/interfaces/igen';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-khorizontal-bars',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './khorizontal-bars.component.html',
  styleUrl: './khorizontal-bars.component.scss'
})
export class KhorizontalBarsComponent {
  @Input('title') title!:string
  @Input('data') data!:IS2N
  @Input('isSmall') isSmall!:boolean
  @Input('sumKey') sumKey!:string
  @Input('marginLeft') startX!:number
  isDarkMode!:Observable<boolean>
  bars!:Array<{name:string, value:number, path:string, nameY:number, rectY:number}>
  viewBox='0 0 500 430'
  constructor(
    private theme$: ThemeService
  ){
    
  }

  ngOnInit(){
    this.startX = this.startX ? this.startX : 40
    this.isDarkMode = this.theme$.getActiveTheme()
    if(this.isSmall){this.viewBox='0 0 500 340'}
    this.bars=[]
    let i = 1
    for (const [key, value] of Object.entries(this.data)) {
      if(key === 'Total'){
        this.bars.push(
          {name: key, value: value, path: this.getBasePath(0, value), nameY: 70, rectY: 79}
        )  
      }else {
        this.bars.push(
          {name: key , value: value , path: this.getBasePath(i, value), nameY: 70+(i*60), rectY: 79+(i*60)}
        )
        i += 1
      }
    }
  }

  getBasePath(itemNo:number, value:number){
    let length = 390/this.data[this.sumKey]
    if(value > 0){ value = value*length }else{ value = 5 }
    let x= this.startX
    let y=91
    let path=''
    if(value >= 387){
      value=387
      y+=(itemNo*60)
      path = "M" +x+"," + y + "a12,12 1 0 1 12,-12 h"+value + "a12,12 1 0 1 12,12 a12,12 1 0 1 -12, 12 h-"+value+ " a12,12 1 0 1 -12,-12 " 
    }else{
      y+=(itemNo*60)
      path = "M" +x+"," + y + "a12,12 1 0 1 12,-12 h"+value + "v24 h-"+value+ " a12,12 1 0 1 -12, -12 z" 
    }
    
    return path
  }
}
