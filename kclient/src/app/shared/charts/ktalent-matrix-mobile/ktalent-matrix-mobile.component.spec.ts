import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtalentMatrixMobileComponent } from './ktalent-matrix-mobile.component';

describe('KtalentMatrixMobileComponent', () => {
  let component: KtalentMatrixMobileComponent;
  let fixture: ComponentFixture<KtalentMatrixMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KtalentMatrixMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KtalentMatrixMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
