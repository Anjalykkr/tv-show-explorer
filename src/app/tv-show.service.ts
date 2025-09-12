import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TvShowService {
  private baseUrl = environment.tvMazeBaseUrl;

  constructor(private http: HttpClient) {}

  fetchShow(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/shows/${id}`);
  }

  searchShows(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search/shows?q=${query}`);
  }

  fetchCast(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/shows/${id}/cast`);
  }

  fetchEpisodes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/shows/${id}/episodes`);
  }
}
