import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KspinnerComponent } from './kspinner.component';

describe('KspinnerComponent', () => {
  let component: KspinnerComponent;
  let fixture: ComponentFixture<KspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KspinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
