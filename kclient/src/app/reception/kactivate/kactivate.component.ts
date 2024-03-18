import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, UrlHandlingStrategy } from '@angular/router';
import { ReceptionService } from '../services/reception.service';
import { IUserXs, IUserXsResult } from '../../../../../common/interfaces/iuser';

@Component({
  selector: 'app-kactivate',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatButtonModule,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './kactivate.component.html',
  styleUrl: './kactivate.component.scss'
})
export class KactivateComponent implements OnInit {
  isMobile!:Observable<boolean>
  isUaSigned!:boolean
  isPcpSigned!:boolean
  form!:FormGroup
  dobTip:string = 'Whatever'
  isError!:boolean

  isUserError!:boolean
  message!:string

  email!:string
  activationCode!:string
  postId!:string
  userInfo!:IUserXs

  constructor(
    private fb: FormBuilder,
    private resonsive$: ResponsiveService,
    private router: Router,
    private reception$: ReceptionService
  ) {
    this.isMobile = this.resonsive$.checkIsMobile()
    this.setActivationForm()
    this.isPcpSigned=true
    this.isUaSigned=true
  }

  ngOnInit(): void {
    this.isUserError = false
    if(this.parseUrl(this.router.url)){
      this.reception$.getActivationData({email: this.email, activationCode: this.activationCode}).subscribe({
        next: (response:IUserXsResult) => {
          console.log(response)
          if(response.status === 200) {
            this.userInfo = response.data
            this.setActivationForm()
          }else {
            this.isUserError = true 
            this.message = "Invalid or expired link"
          }
        }
      })
    }
  }

  parseUrl(url:string){
    let data = url.split('/')
    if(Object.keys(data).length > 0){
      switch(data.length){
        case 4:
          this.activationCode = data[data.length-2]
          this.email = data[data.length-1]
          return true
        case 5:
          this.postId = data[data.length-3]
          this.activationCode = data[data.length-2]
          this.email = data[data.length-1]
          return true
        default:
          return false
      }
    }else{
      return false
    }
  }



  setEULA(consent:boolean){
    this.form.get('eula_signed')?.setValue(consent)
  }
  setPDP(consent:boolean){
    this.form.get('pdp_signed')?.setValue(consent)
  }

  submit() {
    if(this.isFormDataValid()) {
      console.log('valid')
    }
    else { this.isError=true}
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





  setActivationForm(){
    this.form = this.fb.group({
      email: new FormControl (this.userInfo?.email ? this.userInfo?.email : '', [Validators.email, Validators.required]),
      first_name: new FormControl(this.userInfo?.first_name ? this.userInfo.first_name : '', [Validators.required]),
      last_name: new FormControl(this.userInfo?.last_name ? this.userInfo.last_name : '', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      activation_code: new FormControl('', [Validators.required]),
      mobile: new FormControl('', []),
      city: new FormControl('', []),
      country: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirm_password: new FormControl('', [Validators.required]),
      eula_signed: new FormControl(false, []),
      pdp_signed: new FormControl(false, [])
    });  
    this.form.addValidators(
      this.createCompareValidator(
        this.form?.get('password') as FormControl,
        this.form?.get('confirm_password') as FormControl
      )
     );
  }

  isFormDataValid():boolean{
    this.form.markAllAsTouched()
    // this.form.get('country')?.setValue(this.cControl.value)
    this.isUaSigned = this.form.get('eula_signed')?.value 
    this.isPcpSigned = this.form.get('pdp_signed')?.value 
    return this.form.valid && this.isUaSigned && this.isPcpSigned
  }

}
