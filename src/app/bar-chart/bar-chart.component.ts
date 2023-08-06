import { Component, Input } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) completed!: number;

  getSegmentColor(index: number) {
    if (this.completed === this.total) {
      return '#11ba10';
    } else {
      if (index <= this.completed) {
        return '#f1f100';
      } else {
        return '#453c33';
      }
    }
  }
}
