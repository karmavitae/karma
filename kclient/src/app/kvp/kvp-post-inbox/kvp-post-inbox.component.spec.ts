import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpPostInboxComponent } from './kvp-post-inbox.component';

describe('KvpPostInboxComponent', () => {
  let component: KvpPostInboxComponent;
  let fixture: ComponentFixture<KvpPostInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpPostInboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpPostInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
