import { Component, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/player-data';

@Component({
  selector: 'skills-panel',
  templateUrl: './skills-panel.component.html',
  styleUrls: ['./skills-panel.component.scss'],
})
export class SkillsPanelComponent {
  @Input() data!: Record<string, Skill>;
  @Input() shouldUseVirtualLevels!: boolean;
}
