import { Component, Input } from '@angular/core';
import { IFacetExperience } from '../../../../../../common/interfaces/ifacet';
import { KstatusComponent } from '../../icons/kstatus/kstatus.component';
import { KendorsmentComponent } from '../../icons/kvendorsment/kendorsment.component';
import { KverifiedComponent } from '../../icons/kverfied/kverified.component';
@Component({
  selector: 'app-kproficiencies-list',
  standalone: true,
  imports: [
    KstatusComponent,
    KendorsmentComponent,
    KverifiedComponent
  ],
  templateUrl: './kproficiencies-list.component.html',
  styleUrl: './kproficiencies-list.component.scss'
})
export class KproficienciesListComponent {
  @Input('proficiencies') proficiencies!: IFacetExperience[]
  @Input('title') title!:string
  verificationPercent!:number

  constructor(
  ) { 
  }

  ngOnInit(): void {
    if(this.proficiencies && this.proficiencies.length >= 1){
      this.proficiencies.sort((a, b) => b.hours['total'] - a.hours['total'])
    }else{
      this.proficiencies=[]
    }
  }

  getPercent(p:IFacetExperience):number{
    let percent = 0
    p.hours['verified'] = p.hours['verified'] || 0
    if(!(p.hours['verified'] === 0 || p.hours['total'] === 0 ) ){
      percent =  Math.round((p.hours['verified']/p.hours['total'])*100)
    }
    return percent
  }
}