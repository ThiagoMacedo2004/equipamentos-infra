import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDevolucaoEquipamentoComponent } from './dialog-devolucao-equipamento.component';

describe('DialogDevolucaoEquipamentoComponent', () => {
  let component: DialogDevolucaoEquipamentoComponent;
  let fixture: ComponentFixture<DialogDevolucaoEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDevolucaoEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDevolucaoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
