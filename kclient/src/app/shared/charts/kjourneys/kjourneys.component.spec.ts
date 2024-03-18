import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KjourneysComponent } from './kjourneys.component';

describe('KjourneysComponent', () => {
  let component: KjourneysComponent;
  let fixture: ComponentFixture<KjourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KjourneysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KjourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
