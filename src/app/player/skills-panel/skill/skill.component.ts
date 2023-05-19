import { Component, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/player-data';

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

  get level(): number | null {
    return this.shouldUseVirtualLevels
      ? this.skill.virtualLevel
      : this.skill.realLevel;
  }

  get experience(): number {
    return this.skill.experience;
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
}
