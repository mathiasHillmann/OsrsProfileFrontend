import { Component, Input } from '@angular/core';
import { PlayerData } from 'src/interfaces/player-data';

@Component({
  selector: 'diaries-panel',
  templateUrl: './diaries-panel.component.html',
  styleUrls: ['./diaries-panel.component.scss'],
})
export class DiariesPanelComponent {
  @Input() diaries!: PlayerData['diaries'];
}
