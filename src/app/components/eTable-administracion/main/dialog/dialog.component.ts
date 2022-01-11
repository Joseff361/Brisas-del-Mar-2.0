import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { MainMenuService } from "src/app/services/administracion/sistema/main-menu.service";

interface Restaurante {
  capital_departamento: string;
  departamento: string;
  direccion: string;
  especialidad: string;
  horario_atencion: string;
  id: number;
  nombre: string;
  pagina_web: string;
  platillos: string;
  rango_precio: string;
}

interface Ciudad {
  id: number;
  region: number;
  titulo: string;
}

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  ciudades: Ciudad[] = [];
  ciudadActual: Ciudad;
  restaurantes: Restaurante[];
  ciudadFicticia: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainMenuService: MainMenuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mainMenuService.getListOfCities;
    this.ciudades = JSON.parse(localStorage.getItem("Ciudades")) as Ciudad[];

    this.ciudadFicticia = localStorage.getItem("Ciudad");

    this.ciudadActual = this.ciudades.find(
      (data) =>
        this.ciudadFicticia.toLocaleLowerCase() ==
        data.titulo.toLocaleLowerCase()
    );

    console.log("ciudadActual", this.ciudadActual);

    if (this.ciudadActual) {
      this.mainMenuService
        .getListOfRestaurants(this.ciudadActual.id)
        .subscribe((data) => {
          this.restaurantes = data;
          console.log("restaurantes", this.restaurantes);
        });
    }
  }

  reservar(): void {
    this.router.navigate(["clientes/reservar"]);
  }
}
