import { Component, inject } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormsModule } from '@angular/forms';

/**
 * Notes:
 * [(ngModel)]="selectedVehicle" is smart and understands signals (since Angular v17) and will use .set() and () automatically so that we don't need to get the value using selectedVehicle() or set the value using selectedVehicle.set(...).
 * {{ selectedVehicle()?.name }} is just template interpolation, so you need () to get the value.
 */
@Component({
  selector: 'app-vehicle-selection',
  imports: [ FormsModule ],
  standalone: true,
  template: `
    <h1>Star Wars Vehicle Sales</h1>
    @if (isLoading()) {
      <div>...Loading Vehicles</div>
    } @else {
      <div class="content">
        <div class="title">
          {{ pageTitle }}
        </div>

        <select class="select" [(ngModel)]="selectedVehicle">
          <option value="undefined" disabled selected>--Select a vehicle--</option>
          @for(vehicle of vehicles(); track vehicle) {
            <option [ngValue]='vehicle'>{{ vehicle.name }}</option>
          }
        </select>
        <div>Quantity: <input type='number' [(ngModel)]='quantity' ></div>
        <div>Vehicle: {{ selectedVehicle()?.name }}</div>
        <div>Price: {{ selectedVehicle()?.cost_in_credits }}</div>
        <div [style.color]='color()'>Total: {{ total() }}</div>
      </div>
    }
  `,
  styleUrl: './vehicle-selection.css'
})
export class VehicleSelection {
  private vehicleService = inject(VehicleService);

  pageTitle = 'Select a Vehicle';
  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = this.vehicleService.quantity;

  total = this.vehicleService.total;
  color = this.vehicleService.color;

  isLoading = this.vehicleService.isLoading;
}
