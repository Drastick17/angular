import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnularComponent } from './dialog-anular.component';

describe('DialogAnularComponent', () => {
  let component: DialogAnularComponent;
  let fixture: ComponentFixture<DialogAnularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAnularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
