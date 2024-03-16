import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KmenuComponent } from './shared/utils/kmenu/kmenu.component';
import { KfooterComponent } from './shared/utils/kfooter/kfooter.component';
import { KspinnerComponent } from './shared/utils/kspinner/kspinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    KmenuComponent,
    KfooterComponent,
    KspinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kclient';
}
