import { Component } from '@angular/core';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';
import { KvaUsersComponent } from '../kva-users/kva-users.component';

@Component({
  selector: 'app-kva',
  standalone: true,
  imports: [
    KcontextMenuComponent,
    KvaUsersComponent
  ],
  templateUrl: './kva.component.html',
  styleUrl: './kva.component.scss'
})
export class KvaComponent {

}
