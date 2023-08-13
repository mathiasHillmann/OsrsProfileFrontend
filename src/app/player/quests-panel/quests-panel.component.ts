import { Component, Input } from '@angular/core';
import { PlayerData, QuestStatus } from 'src/interfaces/player-data';

@Component({
  selector: 'quests-panel',
  templateUrl: './quests-panel.component.html',
  styleUrls: ['./quests-panel.component.scss'],
})
export class QuestsPanelComponent {
  @Input() quests!: PlayerData['quest'];
  @Input() miniquests!: PlayerData['miniquest'];
  @Input() summary!: PlayerData['summary'];

  getQuestColor(status: string) {
    if (status === QuestStatus.Complete) {
      return 'var(--green)';
    }

    if (status === QuestStatus.InProgress) {
      return 'var(--yellow)';
    }

    if (status === QuestStatus.NotStarted) {
      return 'var(--red)';
    }

    return 'var(--grey)';
  }
}
