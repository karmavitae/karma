import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcircularBarComponent } from './kcircular-bar.component';

describe('KcircularBarComponent', () => {
  let component: KcircularBarComponent;
  let fixture: ComponentFixture<KcircularBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KcircularBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KcircularBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
