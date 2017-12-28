import { Pipe } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe {
  transform(value) {
    let result :string;
    if(typeof value == 'string'){
      result = value.split(' ')[0];
      return result;
    }
  }
}
