import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvrComponent } from './kvr.component';

describe('KvrComponent', () => {
  let component: KvrComponent;
  let fixture: ComponentFixture<KvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
