import { formatNumber } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { Skill } from 'src/interfaces/player-data';

@Component({
  selector: 'skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
  @Input() skill!: Skill;
  @Input() skillName!: string;
  @Input() shouldUseVirtualLevels!: boolean;

  static readonly MAX_NORMAL_LEVEL: number = 99;
  static readonly MAX_VIRTUAL_LEVEL: number = 126;

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  get level(): number | null {
    return this.shouldUseVirtualLevels
      ? this.skill.virtualLevel
      : this.skill.realLevel;
  }

  get experience(): string {
    if (this.skill.experience) {
      return formatNumber(this.skill.experience, this.locale, '1.0-0');
    } else {
      return '0';
    }
  }

  get max(): number {
    return this.shouldUseVirtualLevels
      ? SkillComponent.MAX_VIRTUAL_LEVEL
      : SkillComponent.MAX_NORMAL_LEVEL;
  }

  get trimClass(): string {
    if (this.level) {
      if (this.shouldUseVirtualLevels) {
        if (
          this.level >= SkillComponent.MAX_NORMAL_LEVEL &&
          this.level < SkillComponent.MAX_VIRTUAL_LEVEL
        ) {
          return 'silver-trim';
        } else if (this.level === SkillComponent.MAX_VIRTUAL_LEVEL) {
          return 'gold-trim';
        }
      } else {
        if (this.level === SkillComponent.MAX_NORMAL_LEVEL) {
          return 'gold-trim';
        }
      }
    }

    return '';
  }

  get rank(): string {
    if (this.skill.rank) {
      return formatNumber(this.skill.rank, this.locale, '1.0-0');
    } else {
      return '-';
    }
  }

  get tooltip(): string {
    return `Experience: ${this.experience} (Rank: ${this.rank})`;
  }
}
