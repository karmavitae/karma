import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhorizontalBarsComponent } from './khorizontal-bars.component';

describe('KhorizontalBarsComponent', () => {
  let component: KhorizontalBarsComponent;
  let fixture: ComponentFixture<KhorizontalBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhorizontalBarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KhorizontalBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
