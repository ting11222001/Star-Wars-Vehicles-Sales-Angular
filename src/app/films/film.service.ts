import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { forkJoin, of } from "rxjs";
import { Vehicle } from "../vehicle.service";

/**
 * Notes:
 * What does forkJoin do?
 * 1. It takes an array of Observables (or an object with Observables as properties).
 * 2. It waits until all of them have completed (emitted their final value). Then it emits a single array (or object) containing the last emitted value from each Observable. So, it’s like “wait for all these requests to finish, then give me their results in one go”.
 * 
 * import { forkJoin } from 'rxjs';

  const film1$ = this.http.get('/api/films/1');
  const film2$ = this.http.get('/api/films/2');
  const film3$ = this.http.get('/api/films/3');

  forkJoin([film1$, film2$, film3$]).subscribe(allFilms => {
    // allFilms is an array: [film1, film2, film3]
    console.log(allFilms);
  });
 * 
 * 
 * Why use of([] as Film[])?
 * 1. of() is an RxJS function that creates an Observable that immediately emits the value you give it, then completes.
 * 2. In context:
 * if (!vehicle) return of([] as Film[]);
 * 
 * When no vehicle is selected (vehicle is null), we don’t want to make any HTTP requests.
 * Instead, we just want to return an Observable that emits an empty array right away.
 * of([] as Film[]) does exactly that: it’s an Observable that emits [] (empty film array).
 * 
 * Each "vehicle" object has this "films" field like this:
 * {
    ...
    "films": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/"
    ],
    ...
  }
 * 
 * How the request parameter works with rxResource:
 * 1. The request parameter is a function that returns a value that dictates the parameters for the data fetch.
 * 2. When the value returned by the request function changes, the loader function (also provided to rxResource) is automatically triggered. This re-executes the data fetching logic.
 * 
 * Browser console - After selecting a vehicle:
 * Loading indicator for films:  true
 * Selected vehicle for films:  {name: 'Sand Crawler', model: 'Digger Crawler', …}
 * Loading indicator for films:  false
 * Film data:  (2) [{…}, {…}]
 */
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private http = inject(HttpClient);

  selectedVehicleForFilm = signal<Vehicle | undefined>(undefined);

  private vehicleFilmsResource = rxResource({
    request: () => this.selectedVehicleForFilm(),
    loader: selectedVehicle => {
      const vehicle = selectedVehicle.request;
      if (vehicle) {
        return forkJoin(vehicle.films.map(link => 
          this.http.get<Film>(link))
        )
      }
      return of([] as Film[])
    }
  });
  isFilmLoading = this.vehicleFilmsResource.isLoading;
  vehicleFilms = computed(() => this.vehicleFilmsResource.value() ?? [] as Film[]);

  // Display signal values in the browser console whenever they change
  loadingEff = effect(() => console.log('Loading indicator for films: ', this.isFilmLoading()));
  filmsEff = effect(() => console.log('Film data: ', this.vehicleFilms()));
  selectedVehiclesEff = effect(() => console.log('Selected vehicle for films: ', this.selectedVehicleForFilm()));
}

export interface FilmResponse {
  count: number;
  next: string;
  previous: string;
  results: Film[]
}


export interface Film {
  title: string;
  release_date: Date;
  opening_crawl: string;
}