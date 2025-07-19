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
      <div class="page-title">
        {{ pageTitle }}
      </div>

      <select class="select" [(ngModel)]="selectedVehicle">
        <option value="undefined" disabled selected>--Select a Vehicle--</option>
        @for(vehicle of vehicles(); track vehicle) {
          <option [ngValue]="vehicle">{{ vehicle.name }}</option>
        }
      </select>
    </div>
  `,
  styleUrl: './film-list.css'
})
export class FilmList {
  private filmService = inject(FilmService);
  private vehicleService = inject(VehicleService);
  
  pageTitle = "Film List for Vehicle";
  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
}
