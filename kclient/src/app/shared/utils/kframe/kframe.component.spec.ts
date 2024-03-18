import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KframeComponent } from './kframe.component';

describe('KframeComponent', () => {
  let component: KframeComponent;
  let fixture: ComponentFixture<KframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KframeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
