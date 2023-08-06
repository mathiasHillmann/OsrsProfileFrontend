import { Component, Input } from '@angular/core';
import { Diary } from 'src/interfaces/player-data';

@Component({
  selector: 'diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent {
  @Input() diary!: Diary;
  @Input() diaryName!: string;

  getCompletedTiers(): number {
    return Object.values(this.diary).filter((completed) => completed).length;
  }

  getDiaryTitleColor() {
    const diaries: boolean[] = Object.values(this.diary);

    if (diaries.every((diary) => diary != null && diary === true)) {
      return '#11ba10';
    }

    if (diaries.some((diary) => diary != null && diary !== false)) {
      return '#f1f100';
    }

    return '#8B8B8B';
  }
}
