import { Component, Input } from '@angular/core';
import { PlayerData, QuestStatus } from 'src/app/interfaces/player-data';

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
      return '#11ba10';
    }

    if (status === QuestStatus.InProgress) {
      return '#f1f100';
    }

    if (status === QuestStatus.NotStarted) {
      return '#D20302';
    }

    return '#8B8B8B';
  }
}
