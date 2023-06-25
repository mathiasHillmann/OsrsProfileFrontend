import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Subscription } from 'rxjs';
import { PlayerData } from '../interfaces/player-data';
import {
  HttpError,
  HttpMethod,
  HttpResponse,
  HttpService,
} from '../services/http.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnDestroy, OnInit {
  private sub: Subscription;
  private username!: string;
  playerData!: PlayerData;
  useVirtualLevels: boolean = false;

  @Output()
  loading: Subject<boolean> = new Subject<boolean>();

  get isLoaded(): boolean {
    return !!this.playerData;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {
    this.sub = this.route.params.subscribe(
      (params) => (this.username = params['username'])
    );

    if (this.cookieService.check('virtualLevels')) {
      this.useVirtualLevels = coerceBooleanProperty(
        this.cookieService.get('virtualLevels')
      );
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.loading.next(true));

    this.httpService
      .request(HttpMethod.Get, `player/${this.username}`)
      .subscribe({
        next: (response: HttpResponse<PlayerData>) => {
          this.playerData = response.data;
          this.loading.next(false);
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
          this.loading.next(false);

          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
