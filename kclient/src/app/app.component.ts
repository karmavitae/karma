import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { KmenuComponent } from './shared/utils/kmenu/kmenu.component';
import { KfooterComponent } from './shared/utils/kfooter/kfooter.component';
import { KspinnerComponent } from './shared/utils/kspinner/kspinner.component';
import { KcontextMenuComponent } from './shared/utils/kcontext-menu/kcontext-menu.component';
import { KframeComponent } from './shared/utils/kframe/kframe.component';
import { KsidenavComponent } from './shared/utils/ksidenav/ksidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    KcontextMenuComponent,
    KmenuComponent,
    KspinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kclient';


}
