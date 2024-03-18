import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpolicyUserComponent } from './kpolicy-user.component';

describe('KpolicyUserComponent', () => {
  let component: KpolicyUserComponent;
  let fixture: ComponentFixture<KpolicyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpolicyUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpolicyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
