import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private subject: Subject<string> = new Subject<string>();
  private prefix: string = 'OSRS Profile';
  private title: string = '';

  constructor() {}

  setTitle(title: string) {
    this.title = title;
    this.subject.next(`${this.prefix} - ${this.title}`);
  }

  onChange(): Subject<string> {
    return this.subject;
  }
}
