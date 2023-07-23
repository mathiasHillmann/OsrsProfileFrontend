import { formatNumber } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PlayerData } from 'src/app/interfaces/player-data';

@Component({
  selector: 'summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss'],
})
export class SummaryPanelComponent {
  @Input() data!: PlayerData['summary'];
  @Input() shouldUseVirtualLevels!: boolean;

  get totalLevel(): string {
    return this.shouldUseVirtualLevels
      ? this.data['total']['virtualLevel']
      : this.data['total']['realLevel'];
  }

  get experience(): string {
    return formatNumber(this.data['total']['experience'], 'en-US', '1.0-0');
  }

  get lastSyncTime(): string {
    return new Date(this.data['updatedAt']).toLocaleString();
  }
}
