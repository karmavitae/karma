import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpolicyCookieComponent } from './kpolicy-cookie.component';

describe('KpolicyCookieComponent', () => {
  let component: KpolicyCookieComponent;
  let fixture: ComponentFixture<KpolicyCookieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpolicyCookieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpolicyCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
