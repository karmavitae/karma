import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KinfoComponent } from '../../utils/kinfo/kinfo.component';
import { KfooterComponent } from '../../utils/kfooter/kfooter.component';
import { IArticle } from '../../../../../../common/interfaces/iarticle';
import { KspinnerService } from '../../utils/kspinner/kspinner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kvp-info',
  standalone: true,
  imports: [
    KinfoComponent,
    MatCardModule,
    NgClass,
    AsyncPipe,
    KfooterComponent,
  ],
  templateUrl: './kvp-info.component.html',
  styleUrl: './kvp-info.component.scss'
})
export class KvpInfoComponent {
  isMobile!:Observable<boolean>
  article!:IArticle

  constructor(
    private responsive$: ResponsiveService,
    private kspinner$: KspinnerService,
    private activatedRoute: ActivatedRoute,
    
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

  ngOnInit() {
    this.article = this.activatedRoute.snapshot.data['article']
     this.kspinner$.hideSpinner()
  }

}
