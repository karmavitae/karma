import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DynamicHeightDirective } from '../../directives/dynamic-height.directive';
import { UserService } from '../../services/user.service';
import { IContextMenuItem, IMenu } from '../../../../../../common/interfaces/imenu';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ksidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    DynamicHeightDirective,
    AsyncPipe
  ],
  templateUrl: './ksidenav.component.html',
  styleUrl: './ksidenav.component.scss'
})
export class KsidenavComponent implements OnInit {
  activeMenu!: IMenu
  activeItem!: IContextMenuItem
  constructor(
    private user$:UserService
  ) {

  }
  ngOnInit(): void {
    this.user$.getActiveMenu().subscribe({
      next: (response) => {
        this.activeMenu = response
      }
    })
  }

}
