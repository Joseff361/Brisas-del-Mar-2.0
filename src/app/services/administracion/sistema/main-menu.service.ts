import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MenuItem, MenuSubItem } from "src/app/domain/MainMenu";

const BASE_URL = "https://bsm-ws-api.herokuapp.com/";

interface Region {
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

@Injectable({
  providedIn: "root",
})
export class MainMenuService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = "etable/api/mainMenu";
  }

  getListMenuItems() {
    return this.http.get<MenuItem[]>(this.url + "/" + "listMenuItems");
  }

  getListMenuSubItems() {
    return this.http.get<MenuSubItem[]>(this.url + "/" + "listMenuSubItems");
  }

  getListMenuSubItemsByItem(id: number) {
    return this.http.get<MenuSubItem[]>(
      this.url + "/" + "listMenuSubItems" + "/" + id
    );
  }

  getAccesoByTipoUsuario(id: number) {
    return this.http.get<MenuItem[]>(
      this.url + "/" + "listMenuItems" + "/" + "acceso" + "/" + id
    );
  }

  getListOfCities() {
    return this.http.get<Region[]>(BASE_URL + "api/v1/regiones");
  }

  getListOfRestaurants(id: number) {
    return this.http.get<Region[]>(
      BASE_URL + "api/v1/restaurantes_region/" + String(id)
    );
  }
}
