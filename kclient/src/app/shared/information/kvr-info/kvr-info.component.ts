import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { KinfoComponent } from '../../utils/kinfo/kinfo.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KfooterComponent } from '../../utils/kfooter/kfooter.component';
import { MatIconModule } from '@angular/material/icon';
import { IArticle } from '../../../../../../common/interfaces/iarticle';
import { KspinnerService } from '../../utils/kspinner/kspinner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kvr-info',
  standalone: true,
  imports: [
    KinfoComponent,
    NgClass,
    AsyncPipe,
    MatCardModule,
    KfooterComponent,
    MatIconModule
  ],
  templateUrl: './kvr-info.component.html',
  styleUrl: './kvr-info.component.scss'
})
export class KvrInfoComponent {
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
