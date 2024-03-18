import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpPostSentComponent } from './kvp-post-sent.component';

describe('KvpPostSentComponent', () => {
  let component: KvpPostSentComponent;
  let fixture: ComponentFixture<KvpPostSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpPostSentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpPostSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
