import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {

  transform(value: string, ...args) {
    let result: string;
    switch (value) {
      case 'WAITAUDIT'://待审核
        result = 'orange'
        break;
      case 'WAITPAY'://待付款
        result = 'red'
        break;
      case 'WAITRETURN'://待还款
        result = 'green'
        break;
      case 'HASRETURN'://已还款
        result = 'blue'
        break;
      case 'HASLEND'://已借款
        result = 'Gcolor'
        break;
      case 'WAITTHAW'://待解冻
        result = 'grey'
        break;
      //报销
      case 'WAITANALISIS'://待分析
        result = 'red'
        break;
      case 'WAITCHECK'://待核对
        result = 'green'
        break;
      case 'HASREIM'://已报销
        result = 'blue'
        break;
      //请假
      case 'DOING'://待审核
        result = 'orange'
        break;
      case 'AGREE'://已通过
        result = 'blue'
        break;
      case 'REJECT'://不通过
        result = 'danger'
        break;
    }
    return result;
  }
}
