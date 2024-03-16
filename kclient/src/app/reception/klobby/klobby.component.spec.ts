import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlobbyComponent } from './klobby.component';

describe('KlobbyComponent', () => {
  let component: KlobbyComponent;
  let fixture: ComponentFixture<KlobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlobbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KlobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
