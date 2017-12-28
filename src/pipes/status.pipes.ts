import { Pipe } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe {
    transform(value) {
        let result: string;
        switch (value) {
            case 'WAITAUDIT'://待审核
                result = '待审核';
                break;
            case 'WAITPAY'://待付款
                result = '待付款'
                break;
            case 'WAITRETURN'://待还款
                result = '待还款'
                break;
            case 'HASRETURN'://已还款
                result = '已还款'
                break;
            case 'HASLEND'://已借款
                result = '已借款'
                break;
            case 'WAITTHAW'://待解冻
                result = '待解冻'
                break;
            case 'WAITANALISIS':
                result = '待分析'
                break;
            case 'WAITCHECK':
                result = '待核对'
                break;
            case 'HASREIM':
                result = '已报销'
                break;
            case 'ALL':
                result = '全部'
                break;
            case 'ANNUAL'://請假
                result = '年假'
                break;
            case 'MATTER':
                result = '事假'
                break;
            case 'SICK':
                result = '病假'
                break;
            case 'ADJUST':
                result = '调休'
                break;
            case 'MARRY':
                result = '婚假'
                break;
            case 'MATERNITY':
                result = '产假'
                break;
            case 'PATERNITY':
                result = '陪产假'
                break;
            case 'CHECK':
                result = '产检'
                break;
            case 'FUNERAL':
                result = '丧假'
                break;
            case 'OTHER':
                result = '其他'
                break;
            case 'DOING':
                result = '审核中'
                break;
            case 'AGREE':
                result = '已通过'
                break;
            case 'REJECT':
                result = '不通过'
                break;
            case 'ONJOB':
            result = '在职'
                break;
            case 'LEAVEJOB':
                result = '离职'
                break;
            case 'WAITJOB':
                result = '待离职'
                break;
            default:
                result = value;
                break;
        }
        return result;
    }
}
