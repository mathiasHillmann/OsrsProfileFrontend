import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})
export class InfoPanelComponent {
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() bodyTemplate!: TemplateRef<any>;
  @Input() title?: string;
}
