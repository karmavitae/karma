import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';
import { IChart } from '../../../../../../common/interfaces/ichart';
import { Global } from '../../classes/global';



@Component({
  selector: 'app-kcircular-bar',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './kcircular-bar.component.html',
  styleUrl: './kcircular-bar.component.scss'
})
export class KcircularBarComponent {
  @Input('title') title!:string
  @Input('data') data!:IChart[]
  @Input('chartFor') chartFor!:string
  @Input('isEnable') isEnable!:boolean
  colours=Global.chartColours

  displayData:any[]=[]
  textX=170
  startY=70
  barWidth=10
  isDarkMode!:Observable<boolean>

  constructor(
    private theme$: ThemeService
  ) { }

  ngOnInit(): void {
    this.isDarkMode = this.theme$.getActiveTheme()
    this.setCoordinates()
  }

  setCoordinates(){
    this.data.sort((a,b)=>b.score - a.score)
    let startCircle = this.startY
    let startText = this.startY + 3
    let startRadius = 80
    let colorIndex = 0
    let angleUnit= 270/this.data[0].score

    this.data.forEach((element, index)=>{
      if(index < 3){
        let endAngle = element.score * angleUnit
        let circleBar = this.getArcEndCoordinates(173,148,startRadius, 0, endAngle)
        let bar = { name: element.name, score: element.score, textY: startText, circleBar: circleBar, color: this.colours[colorIndex]}
        this.displayData.push(bar)
        startRadius = startRadius - (this.barWidth+5)
        startText = startText + (this.barWidth+5)
        colorIndex += 1
      }
    })
  }


  getArcEndCoordinates(x:number, y:number, radius:number, startAngle:number, endAngle:number){
    const fullCircle = endAngle - startAngle === 360;
    const start = this.polarToCartesian(x, y, radius, endAngle - 0.01);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
        fullCircle ? 'Z':''
    ].join(' ');

    return d;
  }
  angleInRadians(angleInDegrees:number){
    return (angleInDegrees - 90) * (Math.PI / 180.0)
  }
  polarToCartesian(centerX:number, centerY:number, radius:number, angleInDegrees:number){
    const a = this.angleInRadians(angleInDegrees);
    return {
        x: centerX + (radius * Math.cos(a)),
        y: centerY + (radius * Math.sin(a)),
    };
  }

}
