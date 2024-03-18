import { Component, Input } from '@angular/core';
import { IS2N, IS2S } from '../../../../../../common/interfaces/igen';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { Global } from '../../classes/global';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-khorizontal-bar',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './khorizontal-bar.component.html',
  styleUrl: './khorizontal-bar.component.scss'
})
export class KhorizontalBarComponent {

  @Input('hoursSummary') mileage!:IS2N
  @Input('sumKey') sumKey!:string
  
  fill:IS2S = {
    "Total" :  Global.chartColours[0],
    "Work" : Global.chartColours[1],
    "Learning" : Global.chartColours[2],
    "Extracurricular" : Global.chartColours[3]
  }

  totalValue = 0
  centValue = 0
  items:any[] = []
  displayMileage:any[]=[]
  isDarkMode!:Observable<boolean>

  constructor(
    private theme$: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.theme$.getActiveTheme()
    this.totalValue = this.mileage[this.sumKey]
    this.centValue = (875/this.totalValue)
    this.drawCoordinates()
  }

  drawCoordinates() {
    let x1 = 20; let x2 = 0; let vY1 = 41-15; let vY2 = 64-13; let textY = vY1+10; let anchor ="start"
    for (const [key, value] of Object.entries(this.mileage)) {
        if (value > 0) {
          if (key === 'Total') {
            anchor="start"; 
            let x2 = 875
            let textX = x1 
            this.displayMileage.push( {x1: x1, vX1: x2, vX2: x2, textX: textX, textY: textY, anchor: anchor, vY1: vY1, vY2: vY2, y1: "46", x2: x2, y2: "46", color: this.fill[key], name: key, hours: value})
          } else {
            x2 += Number(value)*this.centValue
            let textX = x2-3 
            anchor="end"
            this.displayMileage.push( {x1: x1, vX1: x2, vX2: x2, textX: textX, textY: textY, anchor: anchor, vY1: vY1, vY2: vY2, y1: "46", x2: x2, y2: "46", color: this.fill[key], name: key, hours: value})
            x1 = x2
          }
          if(vY1 == 41 && vY2 == 64){ vY1 = vY1-15; vY2 = vY2-13; textY =vY1+10 }else{ vY1 = vY1+15; vY2 = vY2+13; textY =vY2 }
      }
    }
  }

}
