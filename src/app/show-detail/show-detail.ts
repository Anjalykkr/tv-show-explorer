import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReviewForm } from '../review-form/review-form';

@Component({
  selector: 'app-show-detail',
  imports: [CommonModule, ReviewForm],
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
      this.fetchShow(+id);
      this.fetchCast(+id);
      this.fetchEpisodes(+id);
    }
  }

  fetchShow(id: number) {
    this.http.get(`https://api.tvmaze.com/shows/${id}`)
      .subscribe(data => this.show.set(data));
  }

  fetchCast(id: number) {
    this.http.get<any[]>(`https://api.tvmaze.com/shows/${id}/cast`)
      .subscribe(data => this.cast.set(data));
  }

  fetchEpisodes(id: number) {
    this.http.get<any[]>(`https://api.tvmaze.com/shows/${id}/episodes`)
      .subscribe(data => this.episodes.set(data));
  }
}
