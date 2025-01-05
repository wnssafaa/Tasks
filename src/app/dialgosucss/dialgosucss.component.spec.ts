import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialgosucssComponent } from './dialgosucss.component';

describe('DialgosucssComponent', () => {
  let component: DialgosucssComponent;
  let fixture: ComponentFixture<DialgosucssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialgosucssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialgosucssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
