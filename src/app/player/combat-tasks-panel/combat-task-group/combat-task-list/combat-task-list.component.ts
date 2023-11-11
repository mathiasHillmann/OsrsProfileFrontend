import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CombatTask } from 'src/interfaces/player-data';

export interface CombatTasksList {
  title: string;
  tasks: CombatTask[];
  bossList?: string[];
  boss?: string;
}

@Component({
  selector: 'combat-task-list',
  templateUrl: './combat-task-list.component.html',
  styleUrls: ['./combat-task-list.component.scss'],
})
export class CombatTasksListComponent {
  bossFilter: FormControl<string | null> = new FormControl<string | null>(
    'all'
  );
  statusFilter: FormControl<string | null> = new FormControl<string | null>(
    'all'
  );
  tierFilter: FormControl<string | null> = new FormControl<string | null>(
    'all'
  );
  bossList: string[] = [];
  tierList: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CombatTasksList,
    public dialogRef: MatDialogRef<CombatTasksListComponent>
  ) {
    this.bossList = [...new Set(this.data.tasks.map((task) => task.monster))];
    this.tierList = [...new Set(this.data.tasks.map((task) => task.tier))];
  }

  getFilteredList() {
    let list: CombatTask[] = this.data.tasks;

    if (this.bossFilter.value && this.bossFilter.value !== 'all') {
      list = list.filter((task) => task.monster === this.bossFilter.value);
    }

    if (this.statusFilter.value && this.statusFilter.value !== 'all') {
      list = list.filter(
        (task) =>
          task.completed ===
          (this.statusFilter.value === 'completed' ? true : false || null)
      );
    }

    if (this.tierFilter.value && this.tierFilter.value !== 'all') {
      list = list.filter((task) => task.tier === this.tierFilter.value);
    }

    return list;
  }

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
