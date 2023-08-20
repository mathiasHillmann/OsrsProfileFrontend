import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TitleService } from 'src/services/title.service';
import {
  HttpError,
  HttpMethod,
  HttpService,
} from '../../services/http.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  username: FormControl = new FormControl(null, [
    Validators.min(1),
    Validators.max(12),
  ]);

  constructor(
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loadingServce: LoadingService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Profile deletion');
  }

  getErrorMessage() {
    if (this.username.hasError('max')) {
      return 'A RuneScape username has a maximum of 12 characters';
    }

    if (this.username.hasError('min')) {
      return 'A RuneScape username has a minimum of 1 character';
    }

    return '';
  }

  onSubmitClick() {
    if (!this.username.valid) {
      return;
    }

    const username: string = this.username.value;

    this.loadingServce.setLoading(true);

    this.httpService
      .request(HttpMethod.Post, 'delete', { username })
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Your request has been sent and will be processed as soon as possible',
            undefined,
            { duration: 5000 }
          );

          this.loadingServce.setLoading(false);
          this.router.navigate(['/']);
        },
        error: (error: HttpError) => {
          this.httpService.defaultErrorHandling(error);
          this.loadingServce.setLoading(false);

          this.router.navigate(['/']);
        },
      });
  }
}
