import { Routes } from '@angular/router';
import { Home } from './home/home';
import { VehicleSelection } from './vehicle-selection/vehicle-selection';
import { FilmList } from './film-list/film-list';
import { CartShell } from './cart/cart-shell/cart-shell';

export const routes: Routes = [
  { path: 'home', component: Home },
  { 
      path: 'vehicles', 
      component: VehicleSelection
  },
  { 
      path: 'films', 
      component: FilmList
  },
  { 
      path: 'cart', 
      component: CartShell
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
