import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KproficienciesListComponent } from './kproficiencies-list.component';

describe('KproficienciesListComponent', () => {
  let component: KproficienciesListComponent;
  let fixture: ComponentFixture<KproficienciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KproficienciesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KproficienciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
