import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ASKFORLEAVE } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-overtime-apply',
  templateUrl: 'overtime-apply.html',
})
export class OvertimeApplyPage {
  paramObj :any={noonBreakOr:false};
  areas:Array<string>;
  peoples:Array<string>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http:ToastService,
    private navHttp: NativeService
  )
     {
  }
  

  ionViewDidLoad() {
    let load = this.http.loadding();
    load.present();
    let p1 =this.http.get(ASKFORLEAVE + 'overwork/v1/areaList');
    let p2 = this.http.get(ASKFORLEAVE + 'overwork/v1/peopleList');
    Promise.all([p1,p2]).then(res => {
      if(res.length){
          this.areas = res[0].data;
          this.peoples = res[1].data;
        }
      load.dismiss();
    })
  }
  submit() {
    this.paramObj.overStartTime = this.paramObj.overStartTime.replace(/\T/g," ").replace(/\Z/g,"");
    this.paramObj.overEndTime = this.paramObj.overEndTime.replace(/\T/g," ").replace(/\Z/g,"");
    this.http.post(ASKFORLEAVE + 'overwork/v1/phone/add',this.paramObj)
      .then(res => {
        if(res.code==0)this.navCtrl.push('OverTimePage',{tab:true});
      })
  }
}
