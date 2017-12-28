import { Pipe } from '@angular/core';

@Pipe({
  name: 'workstatus'
})
export class WorkstatusPipe {
  transform(value) {
    let anyStatu = value.split(',');
    let cssd: any = [];
    for(var i = 0; i<anyStatu.length; i++){
        if(anyStatu[i] == "NORMAL"){
            cssd.push('正常')
        }else if(anyStatu[i] == "LATE"){
            cssd.push('迟到')
        }else if(anyStatu[i] == "OUTSIDE"){
            cssd.push('外勤')
        }else if(anyStatu[i] == "FEE"){
            cssd.push('免扣')
        }
    }

    return cssd.join(',');
  }
}
