import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  search() {
    if (!this.query.trim()) return;
    this.http.get<any[]>(`https://api.tvmaze.com/search/shows?q=${this.query}`)
      .subscribe(results => this.shows.set(results.map(r => r.show)));
  }
}
