import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleSelection } from './vehicle-selection/vehicle-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VehicleSelection],
  template: `
    <app-vehicle-selection></app-vehicle-selection>
  `
})
export class App {
  protected title = 'Star-Wars-Vehicles-Sales-Angular';
}
