import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CombatTask } from 'src/interfaces/player-data';
import {
  CombatTasksList,
  CombatTasksListComponent,
} from './combat-task-list/combat-task-list.component';

@Component({
  selector: 'combat-task-group',
  templateUrl: './combat-task-group.component.html',
  styleUrls: ['./combat-task-group.component.scss'],
})
export class CombatTaskGroupComponent {
  @Input() tasks!: CombatTask[];
  @Input() title!: string;

  private tiersOrder = [
    'Easy',
    'Medium',
    'Hard',
    'Elite',
    'Master',
    'Grandmaster',
  ];

  constructor(private dialog: MatDialog) {}

  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter((task) => task['completed']).length;
  }

  getGroupTitleColor() {
    if (this.tasks.every((task) => task['completed'])) {
      return 'var(--green)';
    }

    if (this.tasks.some((task) => task['completed'])) {
      return 'var(--yellow)';
    }

    return 'var(--grey)';
  }

  openTaskList() {
    const tasks: CombatTask[] = this.tasks.slice(0).sort((a, b) => {
      return this.tiersOrder.indexOf(a.tier) - this.tiersOrder.indexOf(b.tier);
    });

    this.dialog.open<CombatTasksListComponent, CombatTasksList>(
      CombatTasksListComponent,
      {
        panelClass: 'combat-task-dialog',
        data: {
          title: this.title,
          tasks,
        },
      }
    );
  }
}
