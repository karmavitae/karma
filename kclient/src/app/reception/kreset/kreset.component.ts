import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReceptionService } from '../services/reception.service';

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
    MatFormFieldModule
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
  message!:string
  activationCode!:string
  password!:string

  constructor(
    private responsive$: ResponsiveService,
    private router: Router,
    private fb: FormBuilder,
    private reception$: ReceptionService
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.email="dodo@dodo.com"
  }

  ngOnInit() {
    this.clear()
    const { email, activationCode } = this.reception$.parseUrl(this.router.url)
    if(email && activationCode) {
      this.setForm()
      console.log(email, activationCode)
    }else {
      this.isError=true
      this.message="Invalid reset request data"
    }
  }

  onSubmit() {
    this.clear()
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.reception$.reset({email: this.email, password: this.form.get('password')?.value}).subscribe({
        next: (response) => {
          console.log(response)
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

  clear() {
    this.isError=false 
    this.isInfo=false 
    this.message=''
  }

  setForm() {
    this.form = this.fb.group({
      email: new FormControl(this.email, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
    this.form.addValidators(
      this.createCompareValidator(
        this.form?.get('password') as FormControl,
        this.form?.get('confirm_password') as FormControl
      )
     );
  }

  createCompareValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      if (controlOne.value !== controlTwo.value){
        controlTwo.setErrors({password_mismatch: true})
        return { match_error: 'Value does not match' };
      }else{
        return null;
      }
    };
  }

}
