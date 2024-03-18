import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KverifiedComponent } from './kverified.component';

describe('KverifiedComponent', () => {
  let component: KverifiedComponent;
  let fixture: ComponentFixture<KverifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KverifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
