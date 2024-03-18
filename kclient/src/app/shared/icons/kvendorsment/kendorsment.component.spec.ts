import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendorsmentComponent } from './kendorsment.component';

describe('KendorsmentComponent', () => {
  let component: KendorsmentComponent;
  let fixture: ComponentFixture<KendorsmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendorsmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KendorsmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
