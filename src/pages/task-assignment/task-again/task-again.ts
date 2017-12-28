import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { TASK } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-task-again',
  templateUrl: 'task-again.html',
})
export class TaskAgainPage {
  paramObj: any = {};
  userInfo: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    private navHttp: NativeService
  ) {
    this.paramObj.id = navParams.get('id');
  }


  ionViewDidLoad() {
        //获取执行人员
        this.http.get(TASK + 'tasknode/v1/allUsers')
        .then(res => {
          this.userInfo = res.data;
          console.log(res);
        })
    // let load = this.http.loadding();
    // load.present();
    // let p1 = this.http.get(TASK + 'overwork/v1/areaList');
    // let p2 = this.http.get(TASK + 'overwork/v1/peopleList');
    // Promise.all([p1, p2]).then(res => {
    //   if (res.length) {
    //     this.areas = res[0].data;
    //     this.peoples = res[1].data;
    //   }
    //   load.dismiss();
    // })
  }

  submit() {
    this.paramObj.startTime = this.paramObj.startTime.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.endTime = this.paramObj.endTime.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.split = this.paramObj.split?'true':'false';
    this.http.put(TASK + 'tasknode/v1/phone/initiateAgain', this.paramObj)
      .then(res => {
        if (res.code == 0) this.navCtrl.push('TaskAssignmentPage');
        if(res.msg){ this.http.presentToast(res.msg);}
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
  }
}
