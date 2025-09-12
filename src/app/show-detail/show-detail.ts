import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  private http = inject(HttpClient);

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
    this.http.get(`https://api.tvmaze.com/shows/${id}`) //move to service, env variable
      .subscribe({
        next: data => this.show.set(data),
        error: err => {
          console.error('Error fetching show details:', err);
          this.show.set(null);
        }
      });
  }

  fetchCast(id: number) {
    this.http.get<any[]>(`https://api.tvmaze.com/shows/${id}/cast`)
      .subscribe({
        next: data => this.cast.set(data),
        error: err => {
          console.error('Error fetching cast:', err);
          this.cast.set([]);
        }
      });
  }

  fetchEpisodes(id: number) {
    this.http.get<any[]>(`https://api.tvmaze.com/shows/${id}/episodes`)
      .subscribe({
        next: data => this.episodes.set(data),
        error: err => {
          console.error('Error fetching episodes:', err);
          this.episodes.set([]);
        }
      });
  }
}
