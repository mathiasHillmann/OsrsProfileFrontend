import { Component, Input } from '@angular/core';
import { CombatTasks } from 'src/interfaces/player-data';

@Component({
  selector: 'combat-task-group',
  templateUrl: './combat-task-group.component.html',
  styleUrls: ['./combat-task-group.component.scss'],
})
export class CombatTaskGroupComponent {
  @Input() tasks!: CombatTasks[];
  @Input() title!: string;

  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter((task) => task['completed']).length;
  }

  getCompletedTasksForBar(): number {
    const percentage = Math.round(
      (100 * this.getCompletedTasks()) / this.getTotalTasks()
    );

    if (percentage === 0) {
      return 0;
    }

    if (percentage <= 25) {
      return 1;
    }

    if (percentage >= 26 && percentage <= 49) {
      return 2;
    }

    if (percentage >= 50 && percentage < 100) {
      return 3;
    }

    return 4;
  }

  getGroupTitleColor() {
    if (this.tasks.every((task) => task['completed'])) {
      return '#11ba10';
    }

    if (this.tasks.some((task) => task['completed'])) {
      return '#f1f100';
    }

    return '#8B8B8B';
  }
}
