import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VehicleSelection } from './vehicle-selection/vehicle-selection';
import { Home } from './home/home';

/**
 * Notes:
 * router-outlet: defines where to display the routed template
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <div class="navbar">
          <div class="title">{{pageTitle}}</div>
          <nav>
            <ul class="nav-links">
                <li>
                  <a [routerLink]="['/home']">Home</a>
                </li>
                <li>
                  <a [routerLink]="['/vehicles']">Vehicle List</a>
                </li>
                <li>
                  <a [routerLink]="['/films']">Film List</a>
                </li>
                <li>
                  <a [routerLink]="['/cart']">Cart</a>
                </li>
            </ul>  
          </nav>
      </div>   

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class App {
  protected pageTitle = 'Star Wars Vehicles Sales';
}
