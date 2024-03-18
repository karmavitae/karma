import { AsyncPipe, NgClass, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../shared/services/user.service';
import { KformErrorsComponent } from '../../shared/utils/kform-errors/kform-errors.component';
import e from 'express';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { KspinnerService } from '../../shared/utils/kspinner/kspinner.service';
import { MatIconModule } from '@angular/material/icon';
import { KrecoverComponent } from '../krecover/krecover.component';

@Component({
  selector: 'app-klogin',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    NgClass,
    AsyncPipe,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    KrecoverComponent,
    KformErrorsComponent,
  ],
  templateUrl: './klogin.component.html',
  styleUrl: './klogin.component.scss'
})
export class KloginComponent implements OnDestroy {
  isClient!:boolean
  isLogin:boolean = true 
  loginForm!:FormGroup
  isPasswordShow!:boolean
  isFormError!:boolean
  isError!:boolean
  isMobile!:Observable<boolean>
  subscription!:Subscription
  message!:string
  hidePassword!:boolean
  email!:string

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private responsive$: ResponsiveService,
    private auth$: AuthService,
    private user$: UserService,
    private router: Router,
    private kspinner$: KspinnerService
  ) {
    if(isPlatformBrowser(this.platformId)){
      this.isClient=false
    }
    this.hidePassword = true
    this.setLoginForm()
    this.isMobile = this.responsive$.checkIsMobile()
    this.clear()
  }
 

  submitCredentials() {
    this.clear()
    if(this.loginForm.valid) {
      this.kspinner$.showSpinner()
      this.subscription = this.auth$.login(
        { username: this.loginForm.get('email')?.value, 
          password: this.loginForm.get('password')?.value }
        ).subscribe({
          next: (response) => { 
            if(response.status === 200){
              this.router.navigate([this.user$.defaultLink])
            }else {
              this.message = response.message
              this.isError = true
              this.kspinner$.hideSpinner()
            }
          },
          error: (e) => { 
            this.isError=true; 
            this.message = e['message'] 
            this.kspinner$.hideSpinner()
          },
        })
    } else {
      this.isFormError=true
    }
  }


  setLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required])
    })
  }

  clear() {
    this.isFormError = false
    this.isError = false 
    this.message = ''
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  loadRecovery() {
    if(this.loginForm.get('email')?.valid) {
     this.email =this.loginForm.get('email')?.value
     if(this.email && this.email.length>0) {
        this.isLogin = false
     }
    }else {
      this.message = 'Please provide valid email'
      this.isError = true
    }
  }

}
