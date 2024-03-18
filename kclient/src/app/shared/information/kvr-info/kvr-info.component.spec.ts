import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvrInfoComponent } from './kvr-info.component';

describe('KvrInfoComponent', () => {
  let component: KvrInfoComponent;
  let fixture: ComponentFixture<KvrInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvrInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvrInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
