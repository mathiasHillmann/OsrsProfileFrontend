import { Component, Input } from '@angular/core';

@Component({
  selector: 'account-badge',
  templateUrl: './account-badge.component.html',
  styleUrls: ['./account-badge.component.scss'],
})
export class AccountBadgeComponent {
  @Input() accountType!: string;

  get shouldShowBadge(): boolean {
    if (this.accountType === null || this.accountType === 'NORMAL') {
      return false;
    } else {
      return true;
    }
  }

  get badge(): string {
    if (this.accountType === 'IRONMAN') {
      return '/assets/ironman.webp';
    }

    if (this.accountType === 'ULTIMATE_IRONMAN') {
      return '/assets/ironman_ultimate.webp';
    }

    if (this.accountType === 'HARDCORE_IRONMAN') {
      return '/assets/ironman_hardcore.webp';
    }

    if (this.accountType === 'GROUP_IRONMAN') {
      return '/assets/ironman_group.webp';
    }

    if (this.accountType === 'HARDCORE_GROUP_IRONMAN') {
      return '/assets/ironman_group_hardcore.webp';
    }

    return '';
  }

  get badgeTooltip(): string {
    if (this.accountType === 'IRONMAN') {
      return 'Ironman';
    }

    if (this.accountType === 'ULTIMATE_IRONMAN') {
      return 'Ultimate ironman';
    }

    if (this.accountType === 'HARDCORE_IRONMAN') {
      return 'Hardcore ironman';
    }

    if (this.accountType === 'GROUP_IRONMAN') {
      return 'Group ironman';
    }

    if (this.accountType === 'HARDCORE_GROUP_IRONMAN') {
      return 'Hardcore group ironman';
    }

    return '';
  }
}
