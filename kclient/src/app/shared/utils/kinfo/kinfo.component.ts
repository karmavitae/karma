import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IArticle } from '../../../../../../common/interfaces/iarticle';
import { InformationService } from '../../services/information.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kinfo',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    NgClass,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './kinfo.component.html',
  styleUrl: './kinfo.component.scss'
})
export class KinfoComponent {
  @Input('article') article!:IArticle
  isMobile!:Observable<boolean>

  constructor(
    private responsive$: ResponsiveService,
    private information$: InformationService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

  

}

