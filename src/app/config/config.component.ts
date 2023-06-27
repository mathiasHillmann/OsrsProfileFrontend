import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  virtualLevel: FormControl = new FormControl(null);

  constructor(public dialogRef: MatDialogRef<ConfigComponent>) {
    const virtualLevel = localStorage.getItem('virtualLevels');
    if (virtualLevel) {
      this.virtualLevel.setValue(coerceBooleanProperty(virtualLevel));
    }
  }

  onSaveClick(): void {
    localStorage.setItem('virtualLevels', this.virtualLevel.value);
    window.dispatchEvent(new Event('storage'));

    this.dialogRef.close();
  }
}
