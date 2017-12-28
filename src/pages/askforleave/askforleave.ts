import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { ASKFORLEAVE } from '../../config/config';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-askforleave',
  templateUrl: 'askforleave.html',
})
export class AskforleavePage {
  pet: string = "puppies";
  aflList: any;
  gotoCheck: any;
  isleader: any;
  infiniteScroll: any;
  private statusL: string;//请求参数
  private pageNum: number = 1//请假分页
  private pageNumCheck: number = 1//审核分页
  private tab: boolean;
  private hideBtn: boolean = true;//控制上拉加载true为显示
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService, public viewCtrl: ViewController) {
    this.tab = navParams.get('tab');
  }
  @ViewChild(Content) content: Content;
  ionViewDidLoad() {
    this.http.get(ASKFORLEAVE + 'vacate/v1/check/permission')
      .then(res => {
        this.isleader = res.data;
      })
    this.http.get(ASKFORLEAVE + 'vacate/v1/list/phone', { argu: this.aflList, page: this.pageNum })
      .then(res => {
        this.aflList = res.data;
        console.log(res)
      })
    this.http.get(ASKFORLEAVE + 'vacate/v1/audit/list/phone', { argu: this.gotoCheck, page: this.pageNumCheck })
      .then(res => {
        this.gotoCheck = res.data;
        console.log(res)        
      })
    if (this.tab) {
      this.viewCtrl.showBackButton(false);
    }
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage);
  }
  addAfl() {
    this.navCtrl.push('AddAskforleavePage');
  }

  detailAfl(value: string, id: string) {
    this.navCtrl.push('DetailAskforleavePage', { id: id, value: value });
  }
  change() {
    this.hideBtn = true;
    this.content.scrollTo(0, 0, 0);//控制页面切换顶部开始
  }
  //上拉加载
  doInfinite(infiniteScroll, pet) {
    setTimeout(() => {
      if (pet == "kittens") {
        this.pageNumCheck++;
        this.http.get(ASKFORLEAVE + 'vacate/v1/audit/list', { argu: this.gotoCheck, page: this.pageNumCheck })
          .then(res => {
            let data = res.data;
            if (res.code == 0) {
              if (res.data) {
                for (let i = 0, len = data.length, val; i < len; i++) {
                  val = data[i];
                  this.gotoCheck.push(val);
                }
              } else {
                this.hideBtn = false;
              }
            }
            infiniteScroll.complete();
          });
      } else {
        this.pageNum++;
        this.http.get(ASKFORLEAVE + 'vacate/v1/list/phone', { argu: this.aflList, page: this.pageNum })
          .then(res => {
            let data = res.data;
            if (res.code == 0) {
              if (res.data) {
                for (let i = 0, len = data.length, val; i < len; i++) {
                  val = data[i];
                  this.aflList.push(val);
                }
              } else {
                this.hideBtn = false;
              }
            }
            infiniteScroll.complete();
          });
      }
    }, 500);
  }

}
