import { formatNumber } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss'],
})
export class SummaryPanelComponent {
  @Input() data!: Record<string, any>;
  @Input() shouldUseVirtualLevels!: boolean;

  get shouldShowBadge(): boolean {
    if (this.data === null || this.data['accountType'] === 'NORMAL') {
      return false;
    } else {
      return true;
    }
  }

  get badge(): string {
    if (this.data['accountType'] === 'IRONMAN') {
      return '/assets/ironman.webp';
    }

    if (this.data['accountType'] === 'ULTIMATE_IRONMAN') {
      return '/assets/ironman_ultimate.webp';
    }

    if (this.data['accountType'] === 'HARDCORE_IRONMAN') {
      return '/assets/ironman_hardcore.webp';
    }

    if (this.data['accountType'] === 'GROUP_IRONMAN') {
      return '/assets/ironman_group.webp';
    }

    if (this.data['accountType'] === 'HARDCORE_GROUP_IRONMAN') {
      return '/assets/ironman_group_hardcore.webp';
    }

    return '';
  }

  get badgeTooltip(): string {
    if (this.data['accountType'] === 'IRONMAN') {
      return 'Ironman';
    }

    if (this.data['accountType'] === 'ULTIMATE_IRONMAN') {
      return 'Ultimate ironman';
    }

    if (this.data['accountType'] === 'HARDCORE_IRONMAN') {
      return 'Hardcore ironman';
    }

    if (this.data['accountType'] === 'GROUP_IRONMAN') {
      return 'Group ironman';
    }

    if (this.data['accountType'] === 'HARDCORE_GROUP_IRONMAN') {
      return 'Hardcore group ironman';
    }

    return '';
  }

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
