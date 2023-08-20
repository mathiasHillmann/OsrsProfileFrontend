import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from 'src/services/title.service';
import {
  HttpError,
  HttpMethod,
  HttpResponse,
  HttpService,
} from '../../services/http.service';
import { LoadingService } from '../../services/loading.service';

interface Player {
  rank: number;
  username: string;
  views: number;
}

@Component({
  selector: 'most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrls: ['./most-viewed.component.scss'],
})
export class MostViewedComponent {
  players: Player[] = [];

  displayedColumns: string[] = ['demo-rank', 'demo-username', 'demo-views'];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private loadingService: LoadingService,
    private titleService: TitleService
  ) {
    setTimeout(() => this.loadingService.setLoading(true));

    this.httpService.request(HttpMethod.Get, 'most-viewed').subscribe({
      next: (response: HttpResponse<Player[]>) => {
        this.players = response.data;

        this.loadingService.setLoading(false);
      },
      error: (error: HttpError) => {
        this.httpService.defaultErrorHandling(error);

        this.loadingService.setLoading(false);
      },
    });

    this.titleService.setTitle('Most viewed');
  }

  onRowClick(row: Player): void {
    this.router.navigate(['/player', row.username]);
  }
}
