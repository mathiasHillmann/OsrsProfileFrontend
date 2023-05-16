import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpResponse } from '../interfaces/http-response';

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

  constructor(private http: HttpClient, private router: Router) {
    this.search.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          if (value && this.search.valid) {
            this.http
              .get<HttpResponse<string[]>>(
                `http://osrsprofilebackend.test/api/search/${value}`
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
    console.log(this.search.errors);
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
}
