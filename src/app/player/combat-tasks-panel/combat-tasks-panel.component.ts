import { Component, Input } from '@angular/core';
import { CombatTasks, PlayerData } from 'src/interfaces/player-data';

@Component({
  selector: 'combat-tasks-panel',
  templateUrl: './combat-tasks-panel.component.html',
  styleUrls: ['./combat-tasks-panel.component.scss'],
})
export class CombatTasksComponent {
  @Input() tasks!: PlayerData['tasks'];
  currentShowMethod: string = 'tiers';

  getTasks(field: keyof CombatTasks, value: string) {
    return this.tasks.filter((task: CombatTasks) => task[field] === value);
  }

  getBosses() {
    return [
      ...new Set(
        this.tasks.filter((task) => task.boss).map((task) => task.monster)
      ),
    ];
  }

  showTasks(method: string) {
    this.currentShowMethod = method;
  }
}
