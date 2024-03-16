import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KjoinComponent } from './kjoin.component';

describe('KjoinComponent', () => {
  let component: KjoinComponent;
  let fixture: ComponentFixture<KjoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KjoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
