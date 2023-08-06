import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[UsernameInput]',
})
export class UsernameInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    return new RegExp('^[a-zA-Z0-9\\- ]*$').test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: ClipboardEvent) {
    if (event.clipboardData) {
      event.preventDefault();
      const pasteData = event.clipboardData
        .getData('text/plain')
        .replace(/[^a-zA-Z0-9\- ]/g, '');
      this.el.nativeElement.value = pasteData;
    }
  }
}
