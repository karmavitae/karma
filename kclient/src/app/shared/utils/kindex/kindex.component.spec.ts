import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindexComponent } from './kindex.component';

describe('KindexComponent', () => {
  let component: KindexComponent;
  let fixture: ComponentFixture<KindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
