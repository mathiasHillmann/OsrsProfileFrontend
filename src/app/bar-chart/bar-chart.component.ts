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
      return '#11ba10';
    } else {
      return '#f1f100';
    }
  }

  getFilledPercentage() {
    return `${(100 * this.completed) / this.total}%`;
  }
}
