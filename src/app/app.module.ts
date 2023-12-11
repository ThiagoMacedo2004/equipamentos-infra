import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SetoresComponent } from './setores/setores.component';
import { ModelosEquipamentosComponent } from './modelos-equipamentos/modelos-equipamentos.component';
import { ListaComodatosComponent } from './lista-comodatos/lista-comodatos.component';
import { NovoCadastroComponent } from './lista-comodatos/novo-cadastro/novo-cadastro.component';
import { HomeComponent } from './home/home.component';
import { DialogEquipamentosComponent } from './dialogs/dialog-equipamentos/dialog-equipamentos.component';
import { DialogColaboradoresComponent } from './dialogs/dialog-colaboradores/dialog-colaboradores.component';
import { DialogSetoresComponent } from './dialogs/dialog-setores/dialog-setores.component';
import { NovoEquipamentoComponent } from './modelos-equipamentos/novo-equipamento/novo-equipamento.component';
import { DialogNovaMarcaComponent } from './dialogs/dialog-nova-marca/dialog-nova-marca.component';
import { DialogNovoTipoComponent } from './dialogs/dialog-novo-tipo/dialog-novo-tipo.component';
import { DialogDeletarComodatoComponent } from './dialogs/dialog-deletar-comodato/dialog-deletar-comodato.component';
import { DialogDevolucaoEquipamentoComponent } from './dialogs/dialog-devolucao-equipamento/dialog-devolucao-equipamento.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogHistoricoEquipamentoComponent } from './dialogs/dialog-historico-equipamento/dialog-historico-equipamento.component';
import { DialogUsuariosComponent } from './dialogs/dialog-usuarios/dialog-usuarios.component';

registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    SetoresComponent,
    ModelosEquipamentosComponent,
    ListaComodatosComponent,
    NovoCadastroComponent,
    HomeComponent,
    DialogEquipamentosComponent,
    DialogColaboradoresComponent,
    DialogSetoresComponent,
    NovoEquipamentoComponent,
    DialogNovaMarcaComponent,
    DialogNovoTipoComponent,
    DialogDeletarComodatoComponent,
    DialogDevolucaoEquipamentoComponent,
    DialogHistoricoEquipamentoComponent,
    DialogUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
