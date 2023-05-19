import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpResponse } from '../interfaces/http-response';
import { PlayerData } from '../interfaces/player-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  private sub: Subscription;
  playerData!: PlayerData;
  isLoaded: boolean = false;
  useVirtualLevels: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {
    if (this.cookieService.check('virtualLevels')) {
      this.useVirtualLevels = coerceBooleanProperty(
        this.cookieService.get('virtualLevels')
      );
    }
    this.sub = this.route.params.subscribe((params) => {
      this.http
        .get<HttpResponse<PlayerData>>(
          `${environment.apiUrl}/api/player/${params['username']}`
        )
        .subscribe({
          next: (response) => {
            this.playerData = response.data;
            this.isLoaded = true;
          },
          error: (error) => {
            this.snackBar.open(
              `Could not fetch player data: ${
                error?.error?.message ?? 'Unknown reason'
              }`,
              undefined,
              { duration: 5000 }
            );

            this.router.navigate(['/']);
          },
        });
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
