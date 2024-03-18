import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpNetworkComponent } from './kvp-network.component';

describe('KvpNetworkComponent', () => {
  let component: KvpNetworkComponent;
  let fixture: ComponentFixture<KvpNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpNetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
