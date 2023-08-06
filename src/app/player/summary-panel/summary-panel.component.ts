import { formatNumber } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { PlayerData } from 'src/interfaces/player-data';

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
    return formatNumber(this.data['total']['experience'], this.locale, '1.0-0');
  }

  get lastSyncTime(): string {
    return new Date(this.data['updatedAt']).toLocaleString();
  }

  constructor(@Inject(LOCALE_ID) public locale: string) {}
}
