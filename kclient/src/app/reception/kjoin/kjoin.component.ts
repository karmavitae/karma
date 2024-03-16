import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { KjoinService } from './kjoin.service';

@Component({
  selector: 'app-kjoin',
  standalone: true,
  imports: [
    MatCardModule,
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    AsyncPipe,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './kjoin.component.html',
  styleUrl: './kjoin.component.scss'
})
export class KjoinComponent implements OnDestroy {

  isMobile!:Observable<boolean>
  form!: FormGroup
  isError!:boolean
  isOk!:boolean
  message!:string
  subscription!:Subscription

  constructor(
    private responsive$: ResponsiveService,
    private kjoin$: KjoinService,
    private fb: FormBuilder
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.setJoinForm()
    this.clear()
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  clear() {
    this.isError = false 
    this.isOk = false
    this.message = ''
  }

  onSubmit() {
    if(this.form.valid) {
      this.subscription = this.kjoin$.postUser(this.form.value).subscribe({
        next: (response)=>{
          if(response.status===200){
            this.isOk = true
            this.message = response.message
          } else {
            this.isError = true
            this.message = response.message
          } 
        },
        error: (e) => {
          this.isError = true
          this.message = e
        }
      })
    } 
    else {
      this.message = 'Please provide valid input'
      this.isError=true
    }  
  }

  private setJoinForm():void {
    this.form = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }



}
