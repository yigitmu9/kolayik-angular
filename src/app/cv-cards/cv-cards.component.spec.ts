import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCardsComponent } from './cv-cards.component';

describe('CvCardsComponent', () => {
  let component: CvCardsComponent;
  let fixture: ComponentFixture<CvCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
