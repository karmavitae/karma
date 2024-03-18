import { Component } from '@angular/core';
import { KmenuComponent } from '../kmenu/kmenu.component';
import { KfooterComponent } from '../kfooter/kfooter.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IContextMenuItem, IMenu } from '../../../../../../common/interfaces/imenu';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../services/responsive.service';
import { KcontextMenuComponent } from '../kcontext-menu/kcontext-menu.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-kframe',
  standalone: true,
  imports: [
    KmenuComponent,
    KfooterComponent,
    KcontextMenuComponent,
    MatToolbarModule,
    NgClass,
    AsyncPipe,
    MatIconModule
  ],
  templateUrl: './kframe.component.html',
  styleUrl: './kframe.component.scss'
})
export class KframeComponent {

}
