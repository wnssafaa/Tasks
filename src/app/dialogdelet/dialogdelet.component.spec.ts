import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdeletComponent } from './dialogdelet.component';

describe('DialogdeletComponent', () => {
  let component: DialogdeletComponent;
  let fixture: ComponentFixture<DialogdeletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogdeletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogdeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
