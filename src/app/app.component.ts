import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleSelection } from './vehicle-selection/vehicle-selection';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, VehicleSelection],
  template: `
    <app-home></app-home>
    <app-vehicle-selection></app-vehicle-selection>
  `
})
export class App {
  protected title = 'Star-Wars-Vehicles-Sales-Angular';
}
