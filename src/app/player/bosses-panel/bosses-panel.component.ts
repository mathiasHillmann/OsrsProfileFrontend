import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Boss, PlayerData } from 'src/app/interfaces/player-data';

@Component({
  selector: 'bosses-panel',
  templateUrl: './bosses-panel.component.html',
  styleUrls: ['./bosses-panel.component.scss'],
})
export class BossesPanelComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @Input() bosses!: PlayerData['bosses'];

  displayedColumns: string[] = ['text', 'kc', 'pb'];
  dataSource: MatTableDataSource<Boss>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = Object.values(this.bosses);
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

    this.sort.sort({ id: 'kc', start: 'desc', disableClear: false });
    this.changeDetector.detectChanges();
  }

  formatPb(pb?: number) {
    if (pb) {
      return new Date(pb * 1000).toISOString().slice(14, 19);
    } else {
      return '-';
    }
  }
}
