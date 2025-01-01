import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiManagementComponent } from './dpi-management.component';

describe('DpiManagementComponent', () => {
  let component: DpiManagementComponent;
  let fixture: ComponentFixture<DpiManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
