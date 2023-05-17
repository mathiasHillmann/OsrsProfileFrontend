import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpResponse } from '../interfaces/http-response';
import { PlayerData } from '../interfaces/player-data';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  private sub: Subscription | undefined;
  playerData: PlayerData | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.http
        .get<HttpResponse<PlayerData>>(
          `${environment.apiUrl}/api/player/${params['username']}`
        )
        .subscribe({
          next: (response) => {
            this.playerData = response.data;
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
