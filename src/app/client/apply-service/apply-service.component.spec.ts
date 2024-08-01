import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyServiceComponent } from './apply-service.component';

describe('ApplyServiceComponent', () => {
  let component: ApplyServiceComponent;
  let fixture: ComponentFixture<ApplyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
