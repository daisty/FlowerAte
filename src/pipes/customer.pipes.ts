import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customer'
})
export class CustomerPipe {
  transform(value) {
    let result :string;
    switch(value){
        case 'COMPLETEPROJECT':
            result = '已完成项目客户';
            break;
        case 'PROJECTING':
            result = '现项目客户'
            break;
        case 'POTENTIAL':
            result = '潜在客户'
            break;
        case 'FAILURECUSTOMER':
            result = '失败客户'
            break;
        case 'LOSTCUSTOMER':
            result = '已流失客户'
            break;
        case 'VIP':
            result = 'VIP客户';
            break;
        case 'OLD':
            result = '老客户'
            break;
        case 'COOPERATOR':
            result = '合作伙伴'
            break;
        case 'ORDINARY':
            result = '普通客户'
            break;
        case 'OTHER':
            result = '其他'
            break;
        default:
            result = value;
            break;
        }
    return result;
  }
}