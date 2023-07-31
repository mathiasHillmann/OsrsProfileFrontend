import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerData } from '../interfaces/player-data';
import {
  HttpError,
  HttpMethod,
  HttpResponse,
  HttpService,
} from '../services/http.service';
import { LoadingService } from './../services/loading.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  private username!: string | null;
  playerData!: PlayerData;
  useVirtualLevels: boolean = false;

  get isLoaded(): boolean {
    return !!this.playerData;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.username = this.route.snapshot.paramMap.get('username');

    const virtualLevel = localStorage.getItem('virtualLevels');
    if (virtualLevel) {
      this.useVirtualLevels = coerceBooleanProperty(
        localStorage.getItem('virtualLevels')
      );
    }

    window.addEventListener('storage', () => {
      this.useVirtualLevels = coerceBooleanProperty(
        localStorage.getItem('virtualLevels')
      );
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.loadingService.setLoading(true));

    this.httpService
      .request(HttpMethod.Get, `player/${this.username}`)
      .subscribe({
        next: (response: HttpResponse<PlayerData>) => {
          this.playerData = response.data;
          this.loadingService.setLoading(false);
        },
        error: (error: HttpError) => {
          this.snackBar.open(
            `Could not fetch player data: ${
              error?.message ?? 'Unknown reason'
            }`,
            undefined,
            {
              duration: 5000,
              panelClass: 'error-snackbar',
            }
          );
          this.loadingService.setLoading(false);

          this.router.navigate(['/']);
        },
      });
  }
}
