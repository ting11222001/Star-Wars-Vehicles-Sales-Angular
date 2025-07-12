import { Component, signal } from '@angular/core';

/**
 * Notes:
 * img src path needs to look at angular.json: 
 * projects > architect > build > options > assets > input
 * "input": "public" means that save the pictures in the "public" folder in your project root.
 */
@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="content">
      <div class="title">
        {{ pageTitle }}
      </div>

      @if (marketingMessage()) {
        <h2>{{ marketingMessage() }}</h2>
      }
      
      <div>
          <img class="homeImage" src="speeder-bike.png" />
      </div>
    </div>
  `,
  styleUrl: './home.css'
})
export class Home {
  pageTitle = 'Welcome to Star Wars Vehicle Sales';
  marketingMessage = signal("Plenty of vehicles in stock!");

}
