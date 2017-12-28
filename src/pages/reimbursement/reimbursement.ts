import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ToastService } from '../../providers/util/toast.service';
import { APP_URL } from '../../config/config';


@IonicPage()
@Component({
  selector: 'page-reimbursement',
  templateUrl: 'reimbursement.html',
})
export class ReimbursementPage {
  private show: boolean = false;//头部选择框是显示隐藏
  private seleFont: string;//选择的文字
  private tab: boolean;
  private statusL: string = 'ALL';//报销请求状态
  private statusList: any//请求列表
  private pageNum: number = 1;//分页
  private items: any = [
    {
      value: '全部',
      msg: 'ALL'
    },
    {
      value: '待分析',
      msg: 'WAITANALISIS'
    },
    {
      value: '待审核',
      msg: 'WAITAUDIT'
    },
    {
      value: '待核对',
      msg: 'WAITCHECK'
    },
    {
      value: '已报销',
      msg: 'HASREIM'
    },
    {
      value: '待解冻',
      msg: 'WAITTHAW'
    }
  ];
  @ViewChild(Content) content: Content;
  private hideBtn: boolean = true;//控制上拉加载 true为显示

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService, public viewCtrl: ViewController, public platfrom: Platform) {
    this.tab = navParams.get('tab');
  }

  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad() {

    this.http.get(APP_URL + 'phoneReimburse/v1/listAll', { reimPhoneSelectStatus: this.statusL, page: this.pageNum })
      .then(res => {
        this.statusList = res.data;
      });
    if (this.tab) {
      this.viewCtrl.showBackButton(false);
    }
  }
  selectFilter(val: string, title: string): any {
    this.show = !this.show;
    this.statusL = val;//选择的文字对应的英文参数
    this.seleFont = title;//选择的文字
    this.statusList = [];
    if (val) {
      this.pageNum = 1;
      this.http.get(APP_URL + 'phoneReimburse/v1/listAll', { reimPhoneSelectStatus: val, page: 1 })
        .then(res => {
          if (res.data) {
            this.statusList = res.data;
            this.hideBtn = true;//释放上拉加载功能
            this.content.scrollTo(0, 0, 0);//控制滚动到最顶端
          }
        });
    }
  }

  apply() {//申请报销
    this.navCtrl.push('ApplyreimbursementPage');
  }

  toDetail(value: string, id: string) {
    let name: string;
    switch (value) {
      case 'ALL':
        name = 'ALL'
        break;
      case 'WAITAUDIT'://待审核
        name = 'WAITAUDIT'
        break;
      case 'WAITANALISIS'://待分析
        name = 'WAITANALISIS'
        break;
      case 'WAITCHECK'://待核对
        name = 'WAITCHECK'
        break;
      case 'HASREIM'://已报销
        name = 'HASREIM'
        break;
      case 'WAITTHAW'://待解冻
        name = 'WAITTHAW'
        break;
    }
    this.navCtrl.push('ReimdetailsPage', { value: value, name: name, id: id });
  }
  // dismiss() {
  //   this.navCtrl.push(Welcome);
  // }
  //上拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.pageNum++;
      this.http.get(APP_URL + 'phoneReimburse/v1/listAll', { reimPhoneSelectStatus: this.statusL, page: this.pageNum })
        .then(res => {
          let data = res.data;
          if (res.code == 0) {
            if (res.data) {
              for (let i = 0, len = data.length, val; i < len; i++) {
                val = data[i];
                this.statusList.push(val);
              }
            } else {
              this.hideBtn = false;
            }
          }
          infiniteScroll.complete();
        });
    }, 500);
  }
  //下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      for (let i = 0, len = 5, value; i < len; i++) {
        var test = {
          reimer: 'xxx',
          occureDate: '2017.10.17',
          commitDate: '2017.17.10',
          reimPhoneSelectStatus: 'WAITCHECK'
        }
        this.statusList.unshift(test);
      }
      refresher.complete();
    }, 2000);
  }
}
