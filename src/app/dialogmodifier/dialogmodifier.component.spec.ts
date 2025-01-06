import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmodifierComponent } from './dialogmodifier.component';

describe('DialogmodifierComponent', () => {
  let component: DialogmodifierComponent;
  let fixture: ComponentFixture<DialogmodifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogmodifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
