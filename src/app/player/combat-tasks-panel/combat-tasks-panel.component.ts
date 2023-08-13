import { AfterContentInit, Component, Input } from '@angular/core';
import { CombatTask, PlayerData } from 'src/interfaces/player-data';

@Component({
  selector: 'combat-tasks-panel',
  templateUrl: './combat-tasks-panel.component.html',
  styleUrls: ['./combat-tasks-panel.component.scss'],
})
export class CombatTasksComponent implements AfterContentInit {
  @Input() tasks!: PlayerData['tasks'];

  currentShowMethod: string = 'tiers';
  total: number = 0;
  completed: number = 0;

  ngAfterContentInit() {
    this.tasks.forEach((task) => {
      let points: number = this.getTaskPoints(task);

      this.total += points;
      if (task.completed) {
        this.completed += points;
      }
    });
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

  getTaskPoints(task: CombatTask): number {
    switch (task.tier) {
      case 'Easy':
        return 1;
      case 'Medium':
        return 2;
      case 'Hard':
        return 3;
      case 'Elite':
        return 4;
      case 'Master':
        return 5;
      case 'Grandmaster':
        return 6;
    }

    return 0;
  }

  getCurrentTier(): string {
    if (this.completed <= 33) {
      return "Ghommal's hilt 1";
    }

    if (this.completed <= 115) {
      return "Ghommal's hilt 2";
    }

    if (this.completed <= 304) {
      return "Ghommal's hilt 3";
    }

    if (this.completed <= 820) {
      return "Ghommal's hilt 4";
    }

    if (this.completed <= 1465) {
      return "Ghommal's hilt 5";
    }

    if (this.completed <= 2005) {
      return "Ghommal's hilt 6";
    }

    return "Ghommal's hilt 1";
  }

  getPointsString(): string {
    if (this.total) {
      return `${this.completed} Points`;
    } else {
      return '0 / 0';
    }
  }

  getFilledPercentage() {
    if (this.total) {
      return `${(100 * this.completed) / this.total}%`;
    } else {
      return '0%';
    }
  }
}
