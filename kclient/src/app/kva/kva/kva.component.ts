import { Component, OnInit } from '@angular/core';
import { KcontextMenuComponent } from '../../shared/utils/kcontext-menu/kcontext-menu.component';
import { KvaUsersComponent } from '../kva-users/kva-users.component';
import { KspinnerService } from '../../shared/utils/kspinner/kspinner.service';

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
export class KvaComponent implements OnInit {
  constructor(
    private kspinner$: KspinnerService
  ) {}
  ngOnInit(): void {
    this.kspinner$.hideSpinner()
  }



}
