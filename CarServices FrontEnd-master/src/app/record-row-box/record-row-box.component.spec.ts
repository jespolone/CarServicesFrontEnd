import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRowBoxComponent } from './record-row-box.component';

describe('RecordRowBoxComponent', () => {
  let component: RecordRowBoxComponent;
  let fixture: ComponentFixture<RecordRowBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRowBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRowBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
