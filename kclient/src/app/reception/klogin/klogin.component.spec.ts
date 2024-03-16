import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KloginComponent } from './klogin.component';

describe('KloginComponent', () => {
  let component: KloginComponent;
  let fixture: ComponentFixture<KloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
