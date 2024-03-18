import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtalentMatrixWebComponent } from './ktalent-matrix-web.component';

describe('KtalentMatrixWebComponent', () => {
  let component: KtalentMatrixWebComponent;
  let fixture: ComponentFixture<KtalentMatrixWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KtalentMatrixWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KtalentMatrixWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
