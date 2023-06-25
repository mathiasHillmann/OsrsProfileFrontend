import { Component, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpError, HttpMethod, HttpService } from '../services/http.service';

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

  @Output()
  loading: Subject<boolean> = new Subject<boolean>();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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

    this.loading.next(true);
    this.httpService
      .request(HttpMethod.Post, 'delete', { username })
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Your request has been sent and will be processed as soon as possible',
            undefined,
            { duration: 5000 }
          );

          this.loading.next(false);
          this.router.navigate(['/']);
        },
        error: (error: HttpError) => {
          this.httpService.defaultErrorHandling(error);
          this.loading.next(false);

          this.router.navigate(['/']);
        },
      });
  }
}
