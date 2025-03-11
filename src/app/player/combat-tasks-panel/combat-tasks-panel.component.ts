import { AfterContentInit, Component, Input } from '@angular/core';
import { CombatTask, PlayerData } from 'src/interfaces/player-data';

@Component({
  selector: 'combat-tasks-panel',
  templateUrl: './combat-tasks-panel.component.html',
  styleUrls: ['./combat-tasks-panel.component.scss'],
})
export class CombatTasksComponent implements AfterContentInit {
  @Input() tasks!: PlayerData['tasks'];
  @Input() summary!: PlayerData['summary'];

  currentShowMethod: string = 'tiers';
  total: number = 0;
  completed: number = 0;
  completedPoints: number = 0;
  totalPoints: number = 0;
  tier: string = 'unknown';

  ngAfterContentInit() {
    this.completed = this.summary['combatTasks']['completed'];
    this.completedPoints = this.summary['combatTasks']['completedPoints'];
    this.total = this.summary['combatTasks']['total'];
    this.totalPoints = this.summary['combatTasks']['totalPoints'];
    this.tier = this.summary['combatTasks']['tier'];
  }

  getTasks(field: keyof CombatTask, value: string) {
    return this.tasks.filter((task: CombatTask) => task[field] === value);
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

  getPointsString(): string {
    if (this.total) {
      return `${this.completedPoints} Points`;
    } else {
      return '0 / 0';
    }
  }

  getFilledPercentage() {
    if (this.total) {
      return `${(100 * this.completedPoints) / this.totalPoints}%`;
    } else {
      return '0%';
    }
  }
}
