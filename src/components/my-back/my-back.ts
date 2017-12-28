import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-back',
  templateUrl: 'my-back.html'
})
export class MyBackComponent {
  @Input() text: string;

  constructor() { }
  ngAfterViewInit() {
    
  }

}
