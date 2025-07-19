import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private filmUrl = 'https://swapi.py4e.com/api/films';

  private http = inject(HttpClient);
}