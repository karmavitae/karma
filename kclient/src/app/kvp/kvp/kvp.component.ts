import { Component } from '@angular/core';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';

@Component({
  selector: 'app-kvp',
  standalone: true,
  imports: [
    KcontextMenuComponent,
  ],
  templateUrl: './kvp.component.html',
  styleUrl: './kvp.component.scss'
})
export class KvpComponent {

}
