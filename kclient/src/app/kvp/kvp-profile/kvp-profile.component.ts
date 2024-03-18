import { Component } from '@angular/core';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { ThemeService } from '../../shared/services/theme.service';
import { KvpService } from '../services/kvp.service';
import { KspinnerService } from '../../shared/utils/kspinner/kspinner.service';
import { KcircularBarComponent } from '../../shared/charts/kcircular-bar/kcircular-bar.component';
import { ActivatedRoute } from '@angular/router';
import { KtalentMatrixMobileComponent } from '../../shared/charts/ktalent-matrix-mobile/ktalent-matrix-mobile.component';
import { KtalentMatrixWebComponent } from '../../shared/charts/ktalent-matrix-web/ktalent-matrix-web.component';
import { KproficienciesListComponent } from '../../shared/charts/kproficiencies-list/kproficiencies-list.component';
import { KjourneysComponent } from '../../shared/charts/kjourneys/kjourneys.component';
import { KhorizontalBarComponent } from '../../shared/charts/khorizontal-bar/khorizontal-bar.component';
import { KhorizontalBarsComponent } from '../../shared/charts/khorizontal-bars/khorizontal-bars.component';

@Component({
  selector: 'app-kvp-profile',
  standalone: true,
  imports: [
    KcontextMenuComponent,
    MatCardModule,
    AsyncPipe,
    NgClass,
    KcircularBarComponent,
    KtalentMatrixMobileComponent,
    KtalentMatrixWebComponent,
    KproficienciesListComponent,
    KjourneysComponent,
    KhorizontalBarComponent,
    KhorizontalBarsComponent
  ],
  templateUrl: './kvp-profile.component.html',
  styleUrl: './kvp-profile.component.scss'
})
export class KvpProfileComponent {
  isMobile!:Observable<boolean>
  isDarkMode!:Observable<boolean>

  kp!:any

  constructor(
    private responsive$: ResponsiveService,
    private theme$: ThemeService,
    private kvp$: KvpService,
    private kspinner$: KspinnerService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.isDarkMode = this.theme$.getActiveTheme()
  }


  ngOnInit(): void {
    this.kp = this.activatedRoute.snapshot.data['profile']
     this.kspinner$.hideSpinner()
  }
}
