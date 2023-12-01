import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductoComponent } from './dialog-producto.component';

describe('DialogProductoComponent', () => {
  let component: DialogProductoComponent;
  let fixture: ComponentFixture<DialogProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProductoComponent]
    });
    fixture = TestBed.createComponent(DialogProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
