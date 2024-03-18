import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpInfoComponent } from './kvp-info.component';

describe('KvpInfoComponent', () => {
  let component: KvpInfoComponent;
  let fixture: ComponentFixture<KvpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
