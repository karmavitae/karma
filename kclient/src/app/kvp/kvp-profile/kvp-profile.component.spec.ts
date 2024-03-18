import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpProfileComponent } from './kvp-profile.component';

describe('KvpProfileComponent', () => {
  let component: KvpProfileComponent;
  let fixture: ComponentFixture<KvpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
