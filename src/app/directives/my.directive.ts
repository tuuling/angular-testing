import {Directive, Renderer2, ElementRef, OnInit, Input, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[appTest]'
})
export class MyDirective implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2,
              private el: ElementRef) {

  }

  @Input() formControl: FormControl;

  private div;
  private unlisten;

  ngOnInit() {
    this.div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello world!');

    this.renderer.appendChild(this.div, text);

    this.unlisten = this.renderer.listen(this.div, 'click', () => {
      this.formControl.patchValue('');
    });

    this.formControl.valueChanges.subscribe(val => {
      if (val) {
        this.renderer.insertBefore(this.el.nativeElement.parentNode, this.div, this.el.nativeElement);
      } else {
        this.renderer.removeChild(this.el.nativeElement.parentNode, this.div);
      }
    });
  }

  ngOnDestroy() {
    this.unlisten();
  }

}
