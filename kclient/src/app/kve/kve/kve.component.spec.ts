import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KveComponent } from './kve.component';

describe('KveComponent', () => {
  let component: KveComponent;
  let fixture: ComponentFixture<KveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
