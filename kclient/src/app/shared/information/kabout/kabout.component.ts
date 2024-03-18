import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { KinfoComponent } from '../../utils/kinfo/kinfo.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KfooterComponent } from '../../utils/kfooter/kfooter.component';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../../../../../../common/interfaces/iarticle';
import { KspinnerService } from '../../utils/kspinner/kspinner.service';

@Component({
  selector: 'app-kabout',
  standalone: true,
  imports: [
    KinfoComponent,
    NgClass,
    AsyncPipe,
    MatCardModule,
    KfooterComponent,
  ],
  templateUrl: './kabout.component.html',
  styleUrl: './kabout.component.scss'
})
export class KaboutComponent {
  isMobile!:Observable<boolean>
  article!:IArticle
  message!:string

  constructor(
    private responsive$: ResponsiveService,
    private kspinner$: KspinnerService,
    private activatedRoute: ActivatedRoute,
    
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

  ngOnInit() {
    this.article = this.activatedRoute.snapshot.data['article']
    if(!(this.article) || Object.keys(this.article).length === 0){
      this.message = "Unable to fetch the data at this time."
    }
     this.kspinner$.hideSpinner()
  }


}
