import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KstatusComponent } from './kstatus.component';

describe('KstatusComponent', () => {
  let component: KstatusComponent;
  let fixture: ComponentFixture<KstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
