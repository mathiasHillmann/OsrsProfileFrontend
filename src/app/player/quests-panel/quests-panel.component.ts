import { Component, Input } from '@angular/core';
import { QuestStatus, Skill } from 'src/app/interfaces/player-data';

@Component({
  selector: 'quests-panel',
  templateUrl: './quests-panel.component.html',
  styleUrls: ['./quests-panel.component.scss'],
})
export class QuestsPanelComponent {
  @Input() data: Record<string, QuestStatus> | undefined;
}
