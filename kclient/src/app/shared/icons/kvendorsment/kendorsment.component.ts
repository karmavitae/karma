import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-kendorsment',
  standalone: true,
  imports: [
    MatTooltipModule
  ],
  templateUrl: './kendorsment.component.html',
  styleUrl: './kendorsment.component.scss'
})
export class KendorsmentComponent {

  @Input('endorsementCount') endorsementCount!:number
  constructor() { 
   
  }
  ngOnInit(): void {
    if(typeof this.endorsementCount === 'undefined' || this.endorsementCount === null){
      this.endorsementCount = 0
    }
  }
}
