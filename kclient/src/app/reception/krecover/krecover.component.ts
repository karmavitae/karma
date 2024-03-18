import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReceptionService } from '../services/reception.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-krecover',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './krecover.component.html',
  styleUrl: './krecover.component.scss'
})
export class KrecoverComponent {
  @Input('email') email!:string

  isMobile!:Observable<boolean>
  recoveryForm!:FormGroup
  isError!:boolean
  isFormError!:boolean
  isInfo!:boolean
  message!: string

  constructor(
    private responsive$: ResponsiveService,
    private fb: FormBuilder,
    private reception$: ReceptionService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    
  }

  ngOnInit(){
    this.clear()
    this.setRecoveryForm()
  }


  clear() {
    this.isError=false
    this.isInfo = false
    this.message=''
  }

  submitRecoveryRequest() {
    this.clear()
    if(this.recoveryForm.valid) {
      this.reception$.recover(this.recoveryForm.value).subscribe({
        next: (response) => {
          this.message = response.message
          this.isInfo = response.status === 200 ? true : false 
          this.isError = !this.isInfo
        }
      })
    }else {
      this.message = "Please proivde valid email"
      this.isError = true
    }
  }

  setRecoveryForm(){
    this.recoveryForm = this.fb.group({
      email: new FormControl(this.email, [
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ])
    })
  }

}
