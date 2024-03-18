import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ValidationErrors} from '@angular/forms';
import { KformErrorsService } from './kform-errors.service';

@Component({
  selector: 'app-kform-errors',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './kform-errors.component.html',
  styleUrl: './kform-errors.component.scss'
})
export class KformErrorsComponent implements OnInit {
  @Input('form') form!: FormGroup
  errors:string[] = []

  constructor(
    private kFormErrors$: KformErrorsService
  ) {}


  ngOnInit(): void {
    const result = [];
    if(this.form && this.form.controls){}
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.form.get(key)?.errors || {} as ValidationErrors ;
        if (Object.keys(controlErrors).length>0) { this.formatErrors(controlErrors, key)}
      })
    }


  formatErrors(controlErrors:ValidationErrors, key:string) {
    Object.keys(controlErrors).forEach(keyError => {
      this.errors.push(this.kFormErrors$.getErrorMessge(key, keyError))
    });
  }    

}
