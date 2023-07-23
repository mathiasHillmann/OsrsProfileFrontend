import { Component, Input } from '@angular/core';
import { PlayerData } from 'src/app/interfaces/player-data';

@Component({
  selector: 'skills-panel',
  templateUrl: './skills-panel.component.html',
  styleUrls: ['./skills-panel.component.scss'],
})
export class SkillsPanelComponent {
  @Input() data!: PlayerData['skills'];
  @Input() shouldUseVirtualLevels!: boolean;
}
