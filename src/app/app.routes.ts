import { Routes } from '@angular/router';
import { Home } from './home/home';
import { VehicleSelection } from './vehicle-selection/vehicle-selection';

export const routes: Routes = [
  { path: 'home', component: Home },
  { 
      path: 'vehicles', 
      component: VehicleSelection
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
