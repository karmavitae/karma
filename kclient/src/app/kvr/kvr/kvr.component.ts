import { Component } from '@angular/core';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';

@Component({
  selector: 'app-kvr',
  standalone: true,
  imports: [
    KcontextMenuComponent
  ],
  templateUrl: './kvr.component.html',
  styleUrl: './kvr.component.scss'
})
export class KvrComponent {

}
