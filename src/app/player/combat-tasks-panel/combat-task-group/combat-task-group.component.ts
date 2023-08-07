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
