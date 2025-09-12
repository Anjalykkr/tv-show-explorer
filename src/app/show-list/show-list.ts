import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TvShowService } from '../tv-show.service';
import { inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './show-list.html',
  styleUrls: ['./show-list.scss']
})
export class ShowList {
  query = '';
  shows = signal<any[]>([]);

  private tvShowService: TvShowService = inject(TvShowService);

  search() {
    if (!this.query.trim()) return;
    this.tvShowService.searchShows(this.query)
      .subscribe({
        next: (results: any[]) => this.shows.set(results.map((r: any) => r.show)),
        error: (err: any) => {
          console.error('Error fetching shows:', err);
          this.shows.set([]);
        }
      });
  }
}
