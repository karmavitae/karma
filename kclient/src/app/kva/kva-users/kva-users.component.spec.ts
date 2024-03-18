import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvaUsersComponent } from './kva-users.component';

describe('KvaUsersComponent', () => {
  let component: KvaUsersComponent;
  let fixture: ComponentFixture<KvaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvaUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
