import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from '../tv-show.service';
import { ReviewForm } from '../review-form/review-form';
import { EpisodeList } from '../episode-list/episode-list';

@Component({
  selector: 'app-show-detail',
  imports: [CommonModule, ReviewForm, EpisodeList],
  templateUrl: './show-detail.html',
  styleUrls: ['./show-detail.scss']
})
export class ShowDetail implements OnInit{
  private route = inject(ActivatedRoute);
  private tvShowService: TvShowService = inject(TvShowService);

  show = signal<any>(null);
  cast = signal<any[]>([]);
  episodes = signal<any[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchShow(+id); //asynchronous
      this.fetchCast(+id);
      this.fetchEpisodes(+id);
    }
  }

  fetchShow(id: number) {
    this.tvShowService.fetchShow(id)
      .subscribe({
        next: (data: any) => this.show.set(data),
        error: (err: any) => {
          console.error('Error fetching show details:', err);
          this.show.set(null);
        }
      });
  }

  fetchCast(id: number) {
    this.tvShowService.fetchCast(id)
      .subscribe({
        next: (data: any[]) => this.cast.set(data),
        error: (err: any) => {
          console.error('Error fetching cast:', err);
          this.cast.set([]);
        }
      });
  }

  fetchEpisodes(id: number) {
    this.tvShowService.fetchEpisodes(id)
      .subscribe({
        next: (data: any[]) => this.episodes.set(data),
        error: (err: any) => {
          console.error('Error fetching episodes:', err);
          this.episodes.set([]);
        }
      });
  }
}
