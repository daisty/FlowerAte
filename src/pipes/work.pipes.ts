import { Pipe } from '@angular/core';

@Pipe({
    name: 'work'
})
export class WorkPipe {
    transform(value) {
        let result: string;
        switch (value) {
            case 'GO'://上班
                result = '上班';
                break;
            case 'AFTER'://下班
                result = '下班'
                break;
            case 'PC'://PC端
                result = 'PC端'
                break;
            case 'MOBILE'://移动端
                result = '移动端'
                break;
            case 'FINISH'://已完成
                result = '已完成';
                break;
            case 'DOING'://正在执行
                result = '正在执行'
                break;
            case 'UNFINISHED'://未完成
                result = '未完成'
                break;
            case 'RECEIVE'://待接收
                result = '待接收'
                break;
            case 'NOTRECEIVE'://不接收
                result = '不接收'
                break;
            case 'TOBEAUDITED'://上报待审核
                result = '上报待审核'
                break;
            case 'ADMININSTRATION'://行政任务
                result = '行政任务'
                break;
            case 'ENGINEERING'://工程任务
                result = '工程任务'
                break;
            case 'TRAINING'://培训任务
                result = '培训任务'
                break;
            case 'MINUTE'://分钟
                result = '分钟'
                break;
            case 'HOUR'://小时
                result = '小时'
                break;
            case 'DAY'://天
                result = '天'
                break;
            default:
                result = value;
                break;

        }
        return result;
    }
}
