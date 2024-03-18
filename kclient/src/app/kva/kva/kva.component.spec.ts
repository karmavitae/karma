import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvaComponent } from './kva.component';

describe('KvaComponent', () => {
  let component: KvaComponent;
  let fixture: ComponentFixture<KvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
