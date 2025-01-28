import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDossierComponent } from './creer-dossier.component';

describe('CreerDossierComponent', () => {
  let component: CreerDossierComponent;
  let fixture: ComponentFixture<CreerDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerDossierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
