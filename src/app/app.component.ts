import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ConfigComponent } from './config/config.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OSRS Profile';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public loadingService: LoadingService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe({
        next: (event) => this.loadingService.setLoading(false),
      });
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  onCogClick() {
    this.dialog.open(ConfigComponent, {
      height: '12em',
      width: '20em',
    });
  }
}
