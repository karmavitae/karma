import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinfoComponent } from './kinfo.component';

describe('KinfoComponent', () => {
  let component: KinfoComponent;
  let fixture: ComponentFixture<KinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
