import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { TitleService } from './../services/title.service';
import { ConfigComponent } from './config/config.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    public loadingService: LoadingService,
    public title: Title,
    public titleService: TitleService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe({
        next: (event) => this.loadingService.setLoading(false),
      });

    this.titleService.onChange().subscribe({
      next: (title) => {
        this.title.setTitle(title);
      },
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
