import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  ) {}

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
