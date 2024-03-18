import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KformErrorsComponent } from './kform-errors.component';

describe('KformErrorsComponent', () => {
  let component: KformErrorsComponent;
  let fixture: ComponentFixture<KformErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KformErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KformErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
