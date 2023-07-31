import { formatNumber } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  @Input() title!: string;
  @Input() text!: string;
  @Input() icon!: string;
  @Input() smallerText!: boolean;
  @Input() rank!: number;

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  formatRank(): string {
    if (this.rank) {
      return formatNumber(this.rank, this.locale, '1.0-0');
    } else {
      return '-';
    }
  }
}
