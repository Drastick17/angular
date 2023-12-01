import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVenderComponent } from './dialog-vender.component';

describe('DialogVenderComponent', () => {
  let component: DialogVenderComponent;
  let fixture: ComponentFixture<DialogVenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
