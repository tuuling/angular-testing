import {Directive, Renderer2, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class MyDirective implements OnInit {
  constructor(private renderer: Renderer2,
              private el: ElementRef) {
  }

  ngOnInit() {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello world!');

    this.renderer.appendChild(div, text);
    this.renderer.insertBefore(this.el.nativeElement.parentNode, div, this.el.nativeElement);

    this.renderer.listen(div, 'click', () => {
      console.log('asdf');
    });
  }
}
