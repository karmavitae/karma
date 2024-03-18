import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { KinfoComponent } from '../../utils/kinfo/kinfo.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KfooterComponent } from '../../utils/kfooter/kfooter.component';
import { KapprovalComponent } from '../../utils/kapproval/kapproval.component';

@Component({
  selector: 'app-kpolicy-user',
  standalone: true,
  imports: [
    KapprovalComponent,
    NgClass,
    AsyncPipe,
    MatCardModule,
    KfooterComponent,
  ],
  templateUrl: './kpolicy-user.component.html',
  styleUrl: './kpolicy-user.component.scss'
})
export class KpolicyUserComponent {
  isMobile!:Observable<boolean>

  constructor(
    private responsive$: ResponsiveService,
    
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

}
