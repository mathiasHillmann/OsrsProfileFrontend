import { formatNumber } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Boss, PlayerData } from 'src/interfaces/player-data';

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

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private changeDetector: ChangeDetectorRef
  ) {
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

  formatKc(kc?: number): string {
    if (kc) {
      return formatNumber(kc, this.locale, '1.0-0');
    } else {
      return '-';
    }
  }

  formatRank(rank?: number): string {
    if (rank) {
      return formatNumber(rank, this.locale, '1.0-0');
    } else {
      return '-';
    }
  }

  formatPb(pb?: number) {
    if (pb) {
      return new Date(pb * 1000).toISOString().slice(14, 19);
    } else {
      return '-';
    }
  }
}
