import { Component } from '@angular/core';
import { KindexComponent } from '../../shared/utils/kindex/kindex.component';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';

@Component({
  selector: 'app-kva-users',
  standalone: true,
  imports: [
    NgClass,
    KcontextMenuComponent,
    KindexComponent,
    AsyncPipe,
    MatCardModule
  ],
  templateUrl: './kva-users.component.html',
  styleUrl: './kva-users.component.scss'
})
export class KvaUsersComponent {
  isMobile!:Observable<boolean>

  constructor(
    private responsive$: ResponsiveService
  ) {
    console.log('hi')
    this.isMobile = this.responsive$.checkIsMobile()
  }

  ngOnInit() {
    console.log('init hi')
  }

}
