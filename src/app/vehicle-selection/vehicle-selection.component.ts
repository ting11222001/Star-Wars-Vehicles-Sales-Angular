import { Component, inject } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-vehicle-selection',
  imports: [ FormsModule ],
  standalone: true,
  template: `
    <h1>Star Wars Vehicle Sales</h1>
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
  `,
  styles: ``
})
export class VehicleSelection {
  private vehicleService = inject(VehicleService);

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = this.vehicleService.quantity;

  total = this.vehicleService.total;
  color = this.vehicleService.color;
}
