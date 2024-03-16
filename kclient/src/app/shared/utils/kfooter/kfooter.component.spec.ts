import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KfooterComponent } from './kfooter.component';

describe('KfooterComponent', () => {
  let component: KfooterComponent;
  let fixture: ComponentFixture<KfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
