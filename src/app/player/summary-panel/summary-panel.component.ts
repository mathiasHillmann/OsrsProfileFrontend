import { Component, Input } from '@angular/core';

@Component({
  selector: 'summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss'],
})
export class SummaryPanelComponent {
  @Input() data!: Record<string, any>;
}
