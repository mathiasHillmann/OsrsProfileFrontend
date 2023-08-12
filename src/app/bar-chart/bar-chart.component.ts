import { Component, Input } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) completed!: number;

  getSegmentColor() {
    if (this.completed === this.total) {
      return 'var(--green)';
    } else {
      return 'var(--yellow)';
    }
  }

  getFilledPercentage() {
    return `${(100 * this.completed) / this.total}%`;
  }
}
