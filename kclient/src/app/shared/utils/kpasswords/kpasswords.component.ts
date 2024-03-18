import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kpasswords',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgClass
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: KpasswordsComponent
    },
  ],
  templateUrl: './kpasswords.component.html',
  styleUrl: './kpasswords.component.scss'
})
export class KpasswordsComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input('isMobile') isMobile!:boolean
  @Input('markTouched') markTouched!: boolean
  @Output('onPasswordValid') onPasswordValid:EventEmitter<string> = new EventEmitter()
  form!: FormGroup 
  
  currentValue!:string
  onChange = (currentValue:string) => {}
  onTouch = ()=>{}

  isTouched = false
  isDisabled = false

  constructor(
    private fb: FormBuilder
  ) {

  }
  writeValue(currentValue: string): void {
    this.currentValue = currentValue
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange
  }
  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  markAsTouched(): void {
    if(!this.isTouched){
      this.isTouched = true 
      this.form.markAllAsTouched()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['markTouched'] && changes['markTouched'].currentValue === true) {
      this.markAsTouched()
    }
  }

  ngOnInit(): void {
    this.setForm()
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

  setForm(){
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirm_password: new FormControl('', [Validators.required]),
    });  
    this.form.addValidators(
      this.createCompareValidator(
        this.form?.get('password') as FormControl,
        this.form?.get('confirm_password') as FormControl
      )
     );
  }

  onPasswordCompletion() {
    if(this.form.valid) {
      this.onChange(this.form.get('password')?.value)
    } else {
      this.onChange('')
    }
  }


}
