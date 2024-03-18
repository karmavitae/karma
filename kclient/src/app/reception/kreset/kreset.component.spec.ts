import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KresetComponent } from './kreset.component';

describe('KresetComponent', () => {
  let component: KresetComponent;
  let fixture: ComponentFixture<KresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KresetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
