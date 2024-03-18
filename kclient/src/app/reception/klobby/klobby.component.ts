import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { KlobbyService } from './klobby.service';
import { IQuote } from '../../../../../common/interfaces/iquote';
import { MatButtonModule } from '@angular/material/button';
import { KfooterComponent } from '../../shared/utils/kfooter/kfooter.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { KspinnerService } from '../../shared/utils/kspinner/kspinner.service';
import { KmenuComponent } from '../../shared/utils/kmenu/kmenu.component';

@Component({
  selector: 'app-klobby',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    KfooterComponent,
    KmenuComponent
  ],
  templateUrl: './klobby.component.html',
  styleUrl: './klobby.component.scss'
})
export class KlobbyComponent implements OnInit{

  isMobile!:Observable<boolean>
  banner!:IQuote

  constructor(
    private responsive$: ResponsiveService,
    private klobby$: KlobbyService,
    private kspinner$: KspinnerService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.banner = this.klobby$.getQuote()
    this.kspinner$.hideSpinner()
  }

  ngOnInit(): void {

  }
}