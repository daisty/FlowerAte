import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { TASK, USER_URL } from '../../config/config';
import { ToastService } from '../../providers/util/toast.service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-task-assignment',
  templateUrl: 'task-assignment.html',
})
export class TaskAssignmentPage {
  duty: string = "distribution";
  show: boolean = false;
  summary: boolean = false;
  imgsUrl: string = USER_URL + '/v1/titlePic/';
  issue: any;
  execution: any;
  userToken: string = localStorage.getItem('token');
  private pageInite: number = 1//分发任务分页
  private tab: boolean;
  private hideBtn: boolean = true;//控制上拉加载true为显示
  name: any;
  mind: boolean; //控制 加载数据瞬间 不能有上拉操作 
  curPage: string;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    public storage: Storage) {
    this.tab = navParams.get('tab');
    this.name = localStorage.getItem('userName');
  }

  ionViewDidLoad() {
    this.tasK('');
    let load = this.http.loadding();
    load.present();
    let p1 = this.http.get(TASK + 'tasknode/v1/phone/initiate', { execute: this.name });
    let p2 = this.http.get(TASK + 'tasknode/v1/phone/execute', { initiate: this.name });
    Promise.all([p1, p2]).then(res => {
      if (res.length) {
        this.issue = res[0].data;
        this.execution = res[1].data;
      }
      load.dismiss();
    })
    // this.http.get(TASK + 'tasknode/v1/phone/initiate')
    // .then(res =>{
    //   load.dismiss();
    //   this.issue = res.data;
    //   this.issue[0].createTime = this.issue[0].createTime.split(' ')[0];
    //   for (let i = 0, len = this.issue.length; i < len; i++) {
    //     for (let j = 0, len = this.issue[i].photos.length; j < len; j++) {
    //       if (this.issue[i].photos[j]) {
    //         this.issue[i].photos[j] = TASK + `tasknode/v1/downloadFile?path=${encodeURIComponent(this.issue[i].photos[j])}`;
    //       }
    //     }
    //   }
    // }).catch(err=> {
    //   load.dismiss();
    // });

  }

  tasK(duty?, top?) {
    this.curPage = duty
    if (top !== 1) this.content.scrollTo(0, 0, 0);//控制页面切换顶部开始
    this.pageInite = 1;
    this.hideBtn = false;
    this.mind = false;
    if (duty == "distribution") {
      this.summary = false;
      this.http.get(TASK + 'tasknode/v1/phone/initiate', { execute: this.name })
        .then(res => {
          this.issue = res.data;
          this.issue[0].createTime = this.issue[0].createTime.split(' ')[0];
          this.hideBtn = true;
          this.mind = true;
          for (let i = 0, len = this.issue.length; i < len; i++) {
            for (let j = 0, len = this.issue[i].photos.length; j < len; j++) {
              if (this.issue[i].photos[j]) {
                this.issue[i].photos[j] = TASK + `tasknode/v1/downloadFile?path=${encodeURIComponent(this.issue[i].photos[j])}`;
              }
            }
          }
        }).catch(res => {
          this.http.presentToast(res.msg);
        });
    } else if (duty == "run") {
      this.summary = true;
      this.http.get(TASK + 'tasknode/v1/phone/execute', { initiate: this.name })
        .then(res => {
          this.execution = res.data;
          this.execution[0].createTime = this.execution[0].createTime.split(' ')[0];
          this.hideBtn = true;
          this.mind = true;
          for (let i = 0, len = this.execution.length; i < len; i++) {
            for (let j = 0, len = this.execution[i].photos.length; j < len; j++) {
              if (this.execution[i].photos[j]) {
                this.execution[i].photos[j] = TASK + `tasknode/v1/downloadFile?path=${encodeURIComponent(this.execution[i].photos[j])}`;
              }
            }
          }

        }).catch(res => {
          
          this.http.presentToast(res.msg);
        });
    }
  };
  selectDetail(value: string, id: string) {
    if (value == 'UNFINISHED' || value == 'NOTRECEIVE' || value == 'RECEIVE') {

    } else {
      this.navCtrl.push('AssignDetailPage', { id: id, value: value });
    }
  };

  exectDetail(value: string, id: string) {
    if (value == 'UNFINISHED' || value == 'TOBEAUDITED') {

    } else {
      this.navCtrl.push('ExecuteDetailPage', { id: id, value: value });
    }
  };

  taskSummary() {
    this.navCtrl.push('TaskSummaryPage');
  };

  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.mind) {
      setTimeout(() => {
        this.pageInite++
        let duty = this.curPage;
        if (duty == "distribution" && this.mind) {
          this.http.get(TASK + 'tasknode/v1/phone/initiate', { execute: this.name, page: this.pageInite })
            .then(res => {
              this.hideBtn = false;
              infiniteScroll.complete();
              if(JSON.stringify(res.data) !== "{}" && res.data){
                this.dataPush(res.data,this.issue);
              }else{
                this.hideBtn = false;
              }
            }).catch(res => {
              this.http.presentToast(res.msg);
            });
        } else if (duty == "run" && this.mind) {
          this.http.get(TASK + 'tasknode/v1/phone/execute', { initiate: this.name, page: this.pageInite })
            .then(res => {
              this.hideBtn = false;
              infiniteScroll.complete();
              if(JSON.stringify(res.data) !== "{}" && res.data){
                this.dataPush(res.data,this.execution);
              }else{
                this.hideBtn = false;
              }
            }).catch(res => {
              this.http.presentToast(res.msg);
            });
        }
      }, 500);
    }

  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage); //,{page:this.navParams.get('page')}
  }
  dataPush(arr1,arr2){
    for(let i = 0,len = arr1.length;i < len;i++){
      arr2.push(arr1[i]);
    }
  }
}
