import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcontextMenuComponent } from './kcontext-menu.component';

describe('KcontextMenuComponent', () => {
  let component: KcontextMenuComponent;
  let fixture: ComponentFixture<KcontextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KcontextMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KcontextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
