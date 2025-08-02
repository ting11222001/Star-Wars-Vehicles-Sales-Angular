import { Routes } from '@angular/router';
import { Home } from './home/home';
import { VehicleSelection } from './vehicle-selection/vehicle-selection';
import { FilmList } from './films/film-list/film-list';
import { CartShell } from './cart/cart-shell/cart-shell';
import { FilmSelection } from './films/film-selection/film-selection';

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
        path: 'films-details',
        component: FilmSelection },
    { 
        path: 'cart', 
        component: CartShell
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
