import { Component, signal, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await Promise.all([
        this.fetchShow(+id),
        this.fetchCast(+id),
        this.fetchEpisodes(+id)
      ]);
    }
  }

  async fetchShow(id: number): Promise<void> {
    try {
      const data = await firstValueFrom(this.tvShowService.fetchShow(id));
      this.show.set(data);
    } catch (err) {
      console.error('Error fetching show details:', err);
      this.show.set(null);
    }
  }

  async fetchCast(id: number): Promise<void> {
    try {
      const data = await firstValueFrom(this.tvShowService.fetchCast(id));
      this.cast.set(data ?? []);
    } catch (err) {
      console.error('Error fetching cast:', err);
      this.cast.set([]);
    }
  }

  async fetchEpisodes(id: number): Promise<void> {
    try {
      const data = await firstValueFrom(this.tvShowService.fetchEpisodes(id));
      this.episodes.set(data ?? []);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      this.episodes.set([]);
    }
  }
}
