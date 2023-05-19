import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  virtualLevel: FormControl = new FormControl(null);

  constructor(
    public dialogRef: MatDialogRef<ConfigComponent>,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {
    if (this.cookieService.check('virtualLevels')) {
      this.virtualLevel.setValue(
        coerceBooleanProperty(this.cookieService.get('virtualLevels'))
      );
    }
  }

  onSaveClick(): void {
    this.cookieService.set('virtualLevels', this.virtualLevel.value);
    this.snackBar.open(
      'Changes will be set on the next player search',
      undefined,
      { duration: 5000 }
    );

    this.dialogRef.close();
  }
}
