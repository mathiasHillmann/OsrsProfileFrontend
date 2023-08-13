import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private subject: Subject<boolean> = new Subject<boolean>();
  private loading: boolean = false;

  constructor() {}

  setLoading(loading: boolean) {
    this.loading = loading;
    this.subject.next(loading);
  }

  getLoading(): boolean {
    return this.loading;
  }

  onChange(): Subject<boolean> {
    return this.subject;
  }
}
