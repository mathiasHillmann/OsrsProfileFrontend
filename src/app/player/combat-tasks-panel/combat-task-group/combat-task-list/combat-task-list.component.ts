import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CombatTask } from 'src/interfaces/player-data';

export interface CombatTasksList {
  title: string;
  tasks: CombatTask[];
}

@Component({
  selector: 'combat-task-list',
  templateUrl: './combat-task-list.component.html',
  styleUrls: ['./combat-task-list.component.scss'],
})
export class CombatTasksListComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CombatTasksList,
    public dialogRef: MatDialogRef<CombatTasksListComponent>
  ) {}

  getTaskTitleColor(task: CombatTask) {
    if (task.completed) {
      return 'var(--green)';
    } else {
      return 'var(--grey)';
    }
  }

  getImage(tier: string): string {
    switch (tier) {
      case 'Easy':
        return '/assets/combat_tasks_easy.webp';
      case 'Medium':
        return '/assets/combat_tasks_medium.webp';
      case 'Hard':
        return '/assets/combat_tasks_hard.webp';
      case 'Elite':
        return '/assets/combat_tasks_elite.webp';
      case 'Master':
        return '/assets/combat_tasks_master.webp';
      case 'Grandmaster':
        return '/assets/combat_tasks_grandmaster.webp';
    }

    return '';
  }
}
