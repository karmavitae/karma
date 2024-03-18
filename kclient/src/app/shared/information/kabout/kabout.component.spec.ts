import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaboutComponent } from './kabout.component';

describe('KaboutComponent', () => {
  let component: KaboutComponent;
  let fixture: ComponentFixture<KaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KaboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
