import { Component, Input } from '@angular/core';
import { QuestStatus, Skill } from 'src/app/interfaces/player-data';

@Component({
  selector: 'quests-panel',
  templateUrl: './quests-panel.component.html',
  styleUrls: ['./quests-panel.component.scss'],
})
export class QuestsPanelComponent {
  @Input() quests!: Record<string, QuestStatus>;
  @Input() miniquests!: Record<string, QuestStatus>;
  @Input() summary!: Record<string, any>;

  getQuestText(quest: string) {
    return quest.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase()
    );
  }

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
