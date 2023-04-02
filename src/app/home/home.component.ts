import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links = [
    {icon: "home", nome: "Comodatos", link: "/listaComodatos"},
    {icon: "groups", nome: "Colaboradores/Setores", link: "/usuarios"},
    {icon: "devices", nome: "Equipamentos", link: "/modelosEquipamentos"}
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
