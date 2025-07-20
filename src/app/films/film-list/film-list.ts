import { Component, inject } from '@angular/core';
import { FilmService } from '../film.service';
import { VehicleService } from '../../vehicle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-film-list',
  imports: [FormsModule],
  standalone: true,
  template: `
    <div class="container">
      <div class="title">
        {{ pageTitle }}
      </div>

      @if(isVehicleLoading()) {
        <div>...Loading Vehicles</div>
      } @else {
        <select class="select" [(ngModel)]="selectedVehicleForFilm">
          <option value="undefined" disabled selected>--Select a Vehicle--</option>
          @for(vehicle of vehicles(); track vehicle) {
            <option [ngValue]="vehicle">{{ vehicle.name }}</option>
          }
        </select>
        @if(selectedVehicleForFilm() && isFilmLoading()) {
          <div>...Loading Films for this Vehicle</div>

        } @else {
            @if(films().length) {
              <table>
                <thead>
                  <tr>
                      <th>Title</th>
                      <th>Release Date</th>
                      <th>Opening Crawl</th>
                  </tr>
                </thead>

                <tbody>
                  @for (film of films(); track film) {
                  <tr>
                      <td>
                        {{ film.title }}
                      </td>
                      <td>
                        {{ film.release_date }}
                      </td>
                      <td>
                        {{ film.opening_crawl }}
                      </td>
                  </tr>
                  }
                </tbody>
              </table>
            } @else {
              <div>No films found for the selected vehicle.</div>
            }
        }
      }
    </div>
  `,
  styleUrl: './film-list.css'
})
export class FilmList {
  private filmService = inject(FilmService);
  private vehicleService = inject(VehicleService);
  
  pageTitle = "Film List for Vehicles";
  
  isVehicleLoading = this.vehicleService.isVehicleLoading;
  vehicles = this.vehicleService.vehicles;

  selectedVehicleForFilm = this.filmService.selectedVehicleForFilm;
  isFilmLoading = this.filmService.isFilmLoading;
  films = this.filmService.vehicleFilms;
}
