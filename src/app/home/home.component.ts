import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links = [
    {icon: "home", nome: "Comodatos", link: "/", title: "Lista de Comodatos"},
    {icon: "groups", nome: "Colaboradores/Setores", link: "/usuarios", title: "Lista de Colaboradores"},
    {icon: "devices", nome: "Equipamentos", link: "/modelosEquipamentos", title: "Lista de Equipamentos"}
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
