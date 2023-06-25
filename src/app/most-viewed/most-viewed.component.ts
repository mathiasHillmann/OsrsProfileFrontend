import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  HttpError,
  HttpMethod,
  HttpResponse,
  HttpService,
} from '../services/http.service';

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
  @Output()
  loading: Subject<boolean> = new Subject<boolean>();
  players: Player[] = [];

  displayedColumns: string[] = ['demo-rank', 'demo-username', 'demo-views'];

  constructor(private httpService: HttpService, private router: Router) {
    setTimeout(() => this.loading.next(true));

    this.httpService.request(HttpMethod.Get, 'most-viewed').subscribe({
      next: (response: HttpResponse<Player[]>) => {
        this.players = response.data;

        this.loading.next(false);
      },
      error: (error: HttpError) => {
        this.httpService.defaultErrorHandling(error);

        this.loading.next(false);
      },
    });
  }

  onRowClick(row: Player): void {
    this.router.navigate(['/player', row.username]);
  }
}
