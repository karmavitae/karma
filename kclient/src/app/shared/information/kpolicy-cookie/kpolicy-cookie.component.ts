import { Component } from '@angular/core';
import { KapprovalComponent } from '../../utils/kapproval/kapproval.component';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass } from '@angular/common';
import { KfooterComponent } from '../../utils/kfooter/kfooter.component';

@Component({
  selector: 'app-kpolicy-cookie',
  standalone: true,
  imports: [
    KapprovalComponent,
    MatCardModule,
    NgClass,
    AsyncPipe,
    KfooterComponent
  ],
  templateUrl: './kpolicy-cookie.component.html',
  styleUrl: './kpolicy-cookie.component.scss'
})
export class KpolicyCookieComponent {
  isMobile!:Observable<boolean>

  constructor(
    private responsive$: ResponsiveService,
    
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

}
