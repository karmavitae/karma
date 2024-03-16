import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kcontact',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './kcontact.component.html',
  styleUrl: './kcontact.component.scss'
})
export class KcontactComponent {

  isMobile!:Observable<boolean>
  contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private responsive$: ResponsiveService,
    
  ) {
    this.isMobile = this.responsive$.checkIsMobile()
    this.setContactForm()
  }

  setContactForm() {
    this.contactForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    })
  }
}
