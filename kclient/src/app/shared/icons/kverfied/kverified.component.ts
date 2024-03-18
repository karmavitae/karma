import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-kverified',
  standalone: true,
  imports: [
    MatTooltipModule
  ],
  templateUrl: './kverified.component.html',
  styleUrl: './kverified.component.scss'
})
export class KverifiedComponent {

  @Input('percent') percent!:number

  percentileArc!: string
  isFullyVerified = false
  tickColor = '#c1bac5'
  randPercentile!:number
  constructor() {
  }

  ngOnInit(): void {
    this.getArcPerimeter(this.percent)
    this.getColor()
  }

  getPerimeter(radius:number):number {
    return Math.PI*2*radius;
  }

  getColor(){
    if(this.percent > 95){
      this.tickColor = "#669900"
    }else{
      this.tickColor = "#c1bac5"
    }
  }


  getArcPerimeter(p:number){
    if(p >= 99.99){
      this.isFullyVerified = true
    }else{
      this.isFullyVerified = false
      let cirumference = Math.PI * (11*2)
      let arcPerimeter = ((p*cirumference )/100) //to be replaced with percent
      this.percentileArc = arcPerimeter + ' ' + cirumference
    }
    
  }
}