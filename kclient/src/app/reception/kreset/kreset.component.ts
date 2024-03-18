import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReceptionService } from '../services/reception.service';
import { KpasswordsComponent } from '../../shared/utils/kpasswords/kpasswords.component';
import { Global } from '../../shared/classes/global';

@Component({
  selector: 'app-kreset',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    KpasswordsComponent
  ],
  templateUrl: './kreset.component.html',
  styleUrl: './kreset.component.scss'
})
export class KresetComponent {
  form!: FormGroup
  isMobile!:Observable<boolean>
  email!: string
  isInfo!:boolean
  isError!:boolean
  isInitError!:boolean

  message!:string
  activationCode!:string
  password!:string
  markAllTouched!:boolean

  constructor(
    private responsive$: ResponsiveService,
    private router: Router,
    private fb: FormBuilder,
    private reception$: ReceptionService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
  }

  ngOnInit() {
    this.clear()
    if(this.setData()) {
      this.setForm()
    }else {
      this.isInitError = true
      this.isError = true
    }
  }

  onSubmit() {
    this.clear()
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.submitData()
    }
  }

  clear() {
    this.isInitError=false
    this.isError=false 
    this.isInfo=false 
    this.message=''
  }
  
  setData(): boolean {
    let isDataValid = true
    let url = this.router.url
    const { email, activationCode } = url ? this.reception$.parseUrl(url) : { email: '', activationCode: ''}
    if( email && Global.emailRegex.test(email)) {
      this.email = email
    } else {
      isDataValid = false
    } 
    if( activationCode && activationCode.length>0) {
      this.activationCode = activationCode
    } else {
      isDataValid = false
    }
    if(!isDataValid) {
      this.message = "Invalid reset link"
    }
    return isDataValid
  }

  setForm() {
    this.form = this.fb.group({
      email: new FormControl(this.email, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onLogin() {
    this.router.navigate(['/login'])
  }

  submitData() {
    this.reception$.reset({email: this.email, password: this.form.get('password')?.value}).subscribe({
        next: (response) => {
          this.message = response.message
          if(response.status === 200) {
            this.isInfo = true
          } else {
            this.isError = true
          }
        }
      })
  }

}
