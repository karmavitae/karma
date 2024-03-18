import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpolicyPrivacyComponent } from './kpolicy-privacy.component';

describe('KpolicyPrivacyComponent', () => {
  let component: KpolicyPrivacyComponent;
  let fixture: ComponentFixture<KpolicyPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpolicyPrivacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpolicyPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
