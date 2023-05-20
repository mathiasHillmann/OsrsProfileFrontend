import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpResponse } from '../interfaces/http-response';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  search: FormControl = new FormControl(null, [
    Validators.min(1),
    Validators.max(12),
  ]);
  options: string[] = [];

  backgroundImage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          if (value && this.search.valid) {
            this.http
              .get<HttpResponse<string[]>>(
                `${environment.apiUrl}/api/search/${value}`
              )
              .subscribe({
                next: (response) => {
                  this.options = response.data;
                },
              });
          } else {
            this.options = [];
          }
        },
      });

    this.backgroundImage = `/assets/wallpaper${
      ((Math.random() * 10) | 0) + 1
    }.webp`;
  }

  shouldShowNoResults(): boolean {
    if (this.search.untouched) {
      return false;
    }

    if (this.options && this.options.length === 0) {
      return true;
    }

    return false;
  }

  getErrorMessage() {
    if (this.search.hasError('max')) {
      return 'A RuneScape username has a maximum of 12 characters';
    }

    if (this.search.hasError('min')) {
      return 'A RuneScape username has a minimum of 1 character';
    }

    return '';
  }

  onAutocompleteSelection(event: any) {
    this.router.navigate(['/player', event.option.value]);
  }

  onRandomClick() {
    this.http
      .get<HttpResponse<Record<string, string>>>(
        `${environment.apiUrl}/api/random`
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/player', response.data['username']]);
        },
      });
  }
}
