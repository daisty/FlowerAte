import { Component, ElementRef, Input, Renderer, ViewChild, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'my-radio',
  templateUrl: 'my-radio.html'
})
export class MyRadioComponent {
  @Input() buttonColor: string;
  @Input() title: string;
  @Input() option1: string;
  @Input() option2: string;
  @Output() radioChange = new EventEmitter();

  radioValue: string;
  
  @Input()
    get radio() {
        return this.radioValue;
    }
    set radio(val) {
        this.radioValue = val;
        this.radioChange.emit(this.radioValue);
    }


  constructor(public renderer: Renderer) { }
  ngAfterViewInit() {

  }

}
