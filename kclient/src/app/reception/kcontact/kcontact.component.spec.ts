import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcontactComponent } from './kcontact.component';

describe('KcontactComponent', () => {
  let component: KcontactComponent;
  let fixture: ComponentFixture<KcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KcontactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
