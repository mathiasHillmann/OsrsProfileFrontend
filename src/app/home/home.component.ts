import { Component, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpResponse } from '../interfaces/http-response';
import { HttpError, HttpMethod, HttpService } from '../services/http.service';

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

  @Output()
  loading: Subject<boolean> = new Subject<boolean>();

  backgroundImage: string = '';

  constructor(private httpService: HttpService, private router: Router) {
    this.loading.next(true);
    this.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          if (value && this.search.valid) {
            this.loading.next(true);

            this.httpService
              .request(HttpMethod.Get, `search/${value}`)
              .subscribe({
                next: (response: HttpResponse<string[]>) => {
                  this.options = response.data;
                  this.loading.next(false);
                },
                error: (error: HttpError) => {
                  this.httpService.defaultErrorHandling(error);
                  this.loading.next(false);
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
    this.loading.next(true);
    this.httpService.request(HttpMethod.Get, 'random').subscribe({
      next: (response: HttpResponse<Record<string, string>>) => {
        this.loading.next(false);
        this.router.navigate(['/player', response.data['username']]);
      },
      error: (error: HttpError) => {
        this.httpService.defaultErrorHandling(error);
        this.loading.next(false);
      },
    });
  }
}
