import { NovoEquipamentoComponent } from './modelos-equipamentos/novo-equipamento/novo-equipamento.component';
import { ModelosEquipamentosComponent } from './modelos-equipamentos/modelos-equipamentos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NovoCadastroComponent } from './lista-comodatos/novo-cadastro/novo-cadastro.component';
import { ListaComodatosComponent } from './lista-comodatos/lista-comodatos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '',
    component: ListaComodatosComponent
  },

  // {
  //   path: 'listaComodatos',
  //   component: ListaComodatosComponent
  // },

  {
    path: 'novoCadastro',
    component: NovoCadastroComponent
  },

  {
    path: 'usuarios',
    component:UsuariosComponent
  },

  {
    path: 'modelosEquipamentos',
    component: ModelosEquipamentosComponent
  },

  {
    path: 'novoEquipamento',
    component: NovoEquipamentoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
