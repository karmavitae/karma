import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpAreanaComponent } from './kvp-areana.component';

describe('KvpAreanaComponent', () => {
  let component: KvpAreanaComponent;
  let fixture: ComponentFixture<KvpAreanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpAreanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpAreanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
