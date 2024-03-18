import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrecoverComponent } from './krecover.component';

describe('KrecoverComponent', () => {
  let component: KrecoverComponent;
  let fixture: ComponentFixture<KrecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrecoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KrecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
