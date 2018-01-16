import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ASKFORLEAVE,USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-overtime-detail',
  templateUrl: 'overtime-detail.html',
})
export class OvertimeDetailPage {
  status:string;
  imageUrl:string = USER_URL + 'v1/titlePic/';
  token:string  =  localStorage.getItem('token');
  data:any = {lender:'afb',overWorker:'张三',depart:'广州研发部',auditStatus:'NONE',lendWay:'广州项目组',overType:'普通加班',overLong:'2加班2小时',tasker:'老蛋',noonBreakOr:'否认',overStartTime:'2018-1-14',overEndTime:'2015-4-2',position:'班长'};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService
     ) {
    }
  ionViewDidLoad() {
    this.getData();
  }
  getData() {
    let load = this.http.loadding();
    load.present();
    this.http.get(ASKFORLEAVE +`phoneoverwork/v1/getPhoneOneById/${this.navParams.get('id')}`)
      .then((res)=> {//详情
        if(res.code == 0)this.data = res.data;
        load.dismiss();
      })
  }
  //OvertimeAuditopinonPage
  buttonFn(id,page){
    this.navCtrl.push('OvertimeAuditopinonPage',{page:page,id:id});
  }
}
