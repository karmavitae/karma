import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KspinnerService } from './kspinner.service';
import { AsyncPipe } from '@angular/common';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner'

@Component({
  selector: 'app-kspinner',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './kspinner.component.html',
  styleUrl: './kspinner.component.scss'
})
export class KspinnerComponent implements OnInit {
  @Input() value : number = 100;
  @Input() diameter: number = 100;
  @Input() mode: ProgressSpinnerMode = "indeterminate";
  @Input() strokeWidth : number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  @Input() message: string = 'Loading...' 

  isLoading!:Observable<boolean>

  constructor(
    private kspinner$: KspinnerService
  ) {}
  
  ngOnInit(): void {
    this.isLoading = this.kspinner$.isLoading
  }


}
