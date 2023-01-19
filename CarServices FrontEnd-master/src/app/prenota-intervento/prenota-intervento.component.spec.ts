import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotaInterventoComponent } from './prenota-intervento.component';

describe('PrenotaInterventoComponent', () => {
  let component: PrenotaInterventoComponent;
  let fixture: ComponentFixture<PrenotaInterventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotaInterventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotaInterventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
