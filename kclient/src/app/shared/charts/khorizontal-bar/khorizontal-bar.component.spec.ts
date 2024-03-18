import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhorizontalBarComponent } from './khorizontal-bar.component';

describe('KhorizontalBarComponent', () => {
  let component: KhorizontalBarComponent;
  let fixture: ComponentFixture<KhorizontalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhorizontalBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KhorizontalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
