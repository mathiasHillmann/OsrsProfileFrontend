import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Minigame, PlayerData } from 'src/app/interfaces/player-data';

@Component({
  selector: 'minigames-panel',
  templateUrl: './minigames-panel.component.html',
  styleUrls: ['./minigames-panel.component.scss'],
})
export class MinigamesPanelComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @Input() minigames!: PlayerData['minigames'];

  displayedColumns: string[] = ['text', 'score'];
  dataSource: MatTableDataSource<Minigame>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = Object.values(this.minigames);
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item: any, property) => {
      if (null == item[property]) {
        if ('desc' == this.sort.direction) {
          return '\u0000' + '\u0000' + '\u0000';
        } else {
          return '\uFFFF' + '\uFFFF' + '\uFFFF';
        }
      }
      return item[property];
    };

    this.sort.sort({ id: 'score', start: 'desc', disableClear: false });
    this.changeDetector.detectChanges();
  }
}
