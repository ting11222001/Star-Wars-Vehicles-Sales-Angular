import { Component, inject } from '@angular/core';
import { FilmService } from '../film.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-film-selection',
  imports: [FormsModule],
  template: `
    <div class="content">
      <div class="title">
          {{ pageTitle }}
      </div>

      @let currentFilm = film();
      <div class="grid">
          <div class="row">
            <div class="cellLeft"><label for='episode'>Number:</label></div>
            <div class="cellRight">
                <input class="numInput" id='episode' type='number' min="1" max="7" 
                  [(ngModel)]="episodeNum">&nbsp;(release date order)
            </div>
            @if (!isLoading() && !currentFilm) {
                <div class="row">
                  <div class="cellFull">Only movies 1-7 are available.</div>
                </div>
            }
          </div>

          @if (currentFilm) {
            <div class="row">
                <div class="cellLeft">Title:</div>
                <div class="cellRight">{{ currentFilm.title }}</div>
            </div>
            <div class="row">
                <div class="cellLeft">Release Date:</div>
                <div class="cellRight">{{ currentFilm.release_date }}</div>
            </div>
            <div class="row">
                <div class="cellLeft">Opening Crawl: </div>
                <div class="cellRightSmall">{{ currentFilm.opening_crawl }}</div>
            </div>
          }
      </div>
    </div>
  `,
  styleUrl: './film-selection.css'
})
export class FilmSelection {
  pageTitle = "Select a StarWars Film";

  private filmService = inject(FilmService);

  // Signals to support the template
  // episodeNum = signal(undefined);
  // film = signal<Film | undefined>(undefined);
  // isLoading = signal(false);
  episodeNum = this.filmService.episodeNum;
  film = this.filmService.film;
  isLoading = this.filmService.isLoading;
}
