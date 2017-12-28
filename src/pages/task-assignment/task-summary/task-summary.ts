import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TASK} from '../../../config/config';
import { ToastService } from '../../../providers/util/toast.service';

@IonicPage()
@Component({
  selector: 'page-task-summary',
  templateUrl: 'task-summary.html',
})
export class TaskSummaryPage {
  private seleFont :string = '今日';
  private show :boolean = false;
  private index : number = 0;
  private summaryList :any = {};
  private tab :boolean;
  private statusL:string = 'TODAY';//请求参数
  private start:string = '2017-11-11';//请求参数
  private end:string = '2017-11-19';//请求参数
  
  items :any = [
    {
      value:'今日',
      msg:'TODAY'
    },
    {
      value:'昨天',
      msg:'YESTERDAY'
    },
    {
      value:'本周',
      msg:'THISWEEK'
    },
    {
      value:'本月',
      msg:'THISMONTH'
    },
    {
      value:'本季度',
      msg:'THISQUARTER'
    },
    {
      value:'本年',
      msg:'THISYEAR'
    }
  ];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: ToastService) {
  }

  ionViewDidLoad() {
    this.http.get(TASK + 'tasknode/v1/phone/finishCounts',{datatype:this.statusL, startTime:this.start, endTime: this.end})
      .then(res => {
        this.summaryList = res.data;
      }).catch( err => {
        this.http.presentToast(err.msg);
      });
  }

  selectFilter(val:string,title:string) :any {
    this.show = !this.show;
    this.statusL = val;//选择的文字对应的英文参数
    this.seleFont = title;//选择的文字
    this.summaryList = {};
    if(val){
      this.http.get(TASK +'tasknode/v1/phone/finishCounts',{datatype:val, startTime:this.start, endTime: this.end, page:1})
      .then(res => {
        if(res.data){
          this.summaryList = res.data;
        }
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
    }
  }
}
