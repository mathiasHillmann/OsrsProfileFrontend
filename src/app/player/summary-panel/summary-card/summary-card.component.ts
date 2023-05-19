import { Component, Input } from '@angular/core';

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
}
