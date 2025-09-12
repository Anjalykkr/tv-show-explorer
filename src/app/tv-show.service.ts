import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TvShowService {
  private baseUrl = environment.tvMazeBaseUrl;

  constructor(private http: HttpClient) {}

  fetchShow(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchShows(query: string): Observable<any[]> {
    const baseUrl = this.baseUrl.replace(/\/shows$/, '');
    return this.http.get<any[]>(`${baseUrl}/search/shows?q=${query}`);
  }

  fetchCast(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/cast`);
  }

  fetchEpisodes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/episodes`);
  }
}
