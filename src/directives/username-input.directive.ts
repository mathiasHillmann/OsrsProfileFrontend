import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[UsernameInput]',
})
export class UsernameInputDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    return new RegExp('^[a-zA-Z0-9\\- ]*$').test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    if (event.clipboardData) {
      event.preventDefault();
      const pasteData = event.clipboardData
        .getData('text/plain')
        .replace(/[^a-zA-Z0-9\- ]/g, '');
      this.control.control!.setValue(pasteData);
    }
  }
}
