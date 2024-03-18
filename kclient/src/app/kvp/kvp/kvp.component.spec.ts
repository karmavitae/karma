import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpComponent } from './kvp.component';

describe('KvpComponent', () => {
  let component: KvpComponent;
  let fixture: ComponentFixture<KvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
