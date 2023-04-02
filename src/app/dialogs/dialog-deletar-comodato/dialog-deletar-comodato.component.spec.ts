import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletarComodatoComponent } from './dialog-deletar-comodato.component';

describe('DialogDeletarComodatoComponent', () => {
  let component: DialogDeletarComodatoComponent;
  let fixture: ComponentFixture<DialogDeletarComodatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeletarComodatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeletarComodatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
