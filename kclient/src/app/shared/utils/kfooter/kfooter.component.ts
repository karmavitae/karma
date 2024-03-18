import { Component, Input } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'app-kfooter',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './kfooter.component.html',
  styleUrl: './kfooter.component.scss'
})
export class KfooterComponent {

  @Input('isSticky') isSticky!:boolean
  isMobile!:Observable<boolean> 

  constructor(
    private responsive$: ResponsiveService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }


}