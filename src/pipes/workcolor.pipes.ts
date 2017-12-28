import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'workcolor',
})
export class WorkcolorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let result :string;
    switch(value){
        case 'NORMAL'://正常
          result = 'orange'
          break;
        case 'LATE'://迟到
          result = 'danger'
          break;
        case 'OUTSIDE'://外勤
          result = 'green'
          break;
        case 'FEE'://免扣
          result = 'green'
          break;
        default:
          result = 'green'
          break;
      }
    return result;
  }
}
