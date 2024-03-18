import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsidenavComponent } from './ksidenav.component';

describe('KsidenavComponent', () => {
  let component: KsidenavComponent;
  let fixture: ComponentFixture<KsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KsidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
