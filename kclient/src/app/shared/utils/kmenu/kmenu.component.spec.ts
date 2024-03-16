import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmenuComponent } from './kmenu.component';

describe('KmenuComponent', () => {
  let component: KmenuComponent;
  let fixture: ComponentFixture<KmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
