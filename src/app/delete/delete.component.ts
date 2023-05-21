import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpResponse } from '../interfaces/http-response';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private http: HttpClient,
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

    this.http.post(`${environment.apiUrl}/api/delete`, { username }).subscribe({
      next: (response) => {
        this.snackBar.open(
          'Your request has been sent and will be processed as soon as possible',
          undefined,
          { duration: 5000 }
        );

        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open(
          'There was an error trying to request the deletion of your profile',
          undefined,
          { duration: 5000 }
        );

        this.router.navigate(['/']);
      },
    });
  }
}
