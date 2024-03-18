import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpasswordsComponent } from './kpasswords.component';

describe('KpasswordsComponent', () => {
  let component: KpasswordsComponent;
  let fixture: ComponentFixture<KpasswordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpasswordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
