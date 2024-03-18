import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KactivateComponent } from './kactivate.component';

describe('KactivateComponent', () => {
  let component: KactivateComponent;
  let fixture: ComponentFixture<KactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KactivateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
