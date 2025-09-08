import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary: string;
}

@Component({
  selector: 'app-episode-list',
  imports: [CommonModule],
  templateUrl: './episode-list.html',
  styleUrls: ['./episode-list.scss']
})
export class EpisodeList implements OnChanges{
 @Input() episodes: Episode[] = [];

  groupedEpisodes = signal<Record<number, Episode[]>>({});
  seasonKeys = signal<number[]>([]);
  expandedSeason = signal<number | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['episodes']) {
      this.groupEpisodesBySeason();
    }
  }

  groupEpisodesBySeason() {
    const grouped: Record<number, Episode[]> = {};
    for (const ep of this.episodes) {
      if (!grouped[ep.season]) {
        grouped[ep.season] = [];
      }
      grouped[ep.season].push(ep);
    }
    this.groupedEpisodes.set(grouped);
    this.seasonKeys.set(Object.keys(grouped).map(Number));
  }

  toggleSeason(season: number) {
    this.expandedSeason.set(this.expandedSeason() === season ? null : season);
  }
}
