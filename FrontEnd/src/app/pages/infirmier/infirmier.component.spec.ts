import { HomeComponent } from './../home/home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfirmierHomeComponent } from './infirmier.component';

describe('InfirmierHomeComponent', () => {
  let component: InfirmierHomeComponent;
  let fixture: ComponentFixture<InfirmierHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});