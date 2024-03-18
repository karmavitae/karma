import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { IN2S } from '../../../../../../common/interfaces/igen';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kjourneys',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './kjourneys.component.html',
  styleUrl: './kjourneys.component.scss'
})
export class KjourneysComponent {
  @Input('lifeActivities') lifeActivities!: any
  @Input('category') category!:number
  show_menu=false
  MAX_ITEMS = 5
  display_menu = Array(this.MAX_ITEMS).fill(false)
  activateChildren!:boolean
  specifications!:IN2S
  titles:Record<number, string> = {
    0: "Work", 
    1: "Education",
    2: "CPD and Training",
    3: "Extracurricular Activities"
  }
  metaSubscription!:Subscription

  constructor(
    private router: Router,
    // private ms$: MetaService
  ) { }

  ngOnInit(): void {
    this.setMetadata(this.category)
  }

 

  loadKarmaAdd(){
    // this.router.navigate(['kvp/journey'],
    //   {state: {category: this.category, isCreate: true, experience: {} as IExperience}})
  }

  loadKarmaEdit(e:any){
    // this.router.navigate(['kvp/journey'],
    // {state: {category: this.category, isCreate: false, experience: e}})
  }  

  loadKarmaPost(e:any){
    // if(e.proficiencies.length > 0){
    // this.router.navigate(['karmapost/post'],
    // {state: {category: this.category, isCreate: true, experience: e}})
    // }else{
    //   window.alert('To create a post, you must first add proficiencies to your experience: ' + e.title)
    // }
  }


  show(i: number){
    this.display_menu[i]=true
  }
  hide(i: number){
    this.display_menu[i]=false
  }
  display(i: number):boolean{
    return this.display_menu[i]
  }

  getSpecification(n:number):string{
    let item = this.specifications[n]
    return  item || ''
  }

  setMetadata(category:number){
    this.activateChildren=true
    // this.specifications = this.ms$.getFacet(String(category))
  }

  ngOnDestroy() {
    if(this.metaSubscription) {
      this.metaSubscription.unsubscribe()
    }
  }
}
