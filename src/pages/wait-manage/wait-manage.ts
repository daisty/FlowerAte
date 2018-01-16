import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { WAITMANAGE,USER_URL } from '../../config/config';
import { NativeService } from '../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-wait-manage',
  templateUrl: 'wait-manage.html',
})
export class WaitManagePage {
  isBool:boolean = false;
  loading:any;
  titleArr:Array<{title:string,type:string}> = [//筛选标题
                        {title:'全部',type:''},
                        {title:'查看',type:'SEE'},
                        {title:'审核',type:'ADUIT'},
                        {title:'确认',type:'CONFIRM'},
                        {title:'核对',type:'CHECK'},
                        {title:'制作',type:'MAKE'},
                        {title:'待处理',type:'SEENODEAL'},
                        {title:'未查看未处理',type:'NOSEENODEAL'},
                        {title:'逾期未处理',type:'NODEAL'},
                        {title:'已处理',type:'HAVEDEAL'},];
  titileIndex:number = 0;//记录当前所点击title的对象 
  imageUrl:string = USER_URL + '/v1/titlePic/'+ localStorage.getItem('userName') +'?path=';
  statusList:Array<{contents?,fatherBO?,type?}> = [];//全部
  pet:string = 'all';
   @ViewChild('myd') srcollX;
  constructor(
    public navCtrl: NavController,
    public http:ToastService,
    public navHttp: NativeService,
    public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    this.change('');
  }
  ionViewDidLeave() {
    this.loading.dismiss();
  }
  change(type:string,value?:string) {
    this.isBool = false;
    this.loading = this.http.loadding();
    this.loading.present();
    this.http.get( WAITMANAGE + 'event/v1/allList',{type:type})
    .then((res)=> {
      this.loading.dismiss();
      if(res.code == 0) {
        this.statusList = res.data;
        if(this.statusList){
          for(let i = 0,len = this.statusList.length;i < len;i++){
            let o = this.statusList[i];
            if(o.fatherBO.functionEnglishName == 'Vacate') {//判断事件类型 =》 请假
              o.type = 'vacate';
            }else if(o.fatherBO.functionEnglishName == 'ReimburseRecord') {//判断事件类型 =》 报销
              o.type = 'reimbursement';
            }else if(o.fatherBO.functionEnglishName == 'ApplyLend') {//判断事件类型 =》 借款
              o.type = 'applyLend';
            }else if(o.fatherBO.functionEnglishName == 'OverWork') {//判断事件类型 =》 加班
              o.type = 'overWork';
            }
          }
        }
      }
      if(value) {
        this.gg(value);
      }
    }).catch(err=> {
      this.loading.dismiss();
      this.http.presentToast('服务器出错，请联系管理员')
    })
  }
  selectTitle(index:number,t:string) {
    this.titileIndex = index;
    this.change(t);
  }
  gg(value: string) {
    for(let i = 0,len = this.titleArr.length;i < len;i++) {
      if(value == this.titleArr[i].title){
        this.titileIndex = i;
        if(i > 4) {
          this.srcollX.nativeElement.scrollLeft = 40 * (i - 4);//在界面上显示点击标题
        }
        break;
      }
    }
  }
  toPage(obj):void {
    switch(obj.type){
      case 'vacate':
        let loanModal2 = this.modalCtrl.create('AskforleavePage',{tab:true,page:1});//page =1指向返回是待办事件
         loanModal2.present();
         break;
      case 'reimbursement':
      let loanModal1 = this.modalCtrl.create('ReimbursementPage',{tab:true,page:1});//page =1指向返回是待办事件
         loanModal1.present();
         break;
      case 'applyLend':
         let loanModal = this.modalCtrl.create('BorrowManagePage',{tab:true,page:1});//page =1指向返回是待办事件
         loanModal.present();
         break;
      case 'overWork':
        let loanModal3 = this.modalCtrl.create('OverTimePage',{tab:true,page:1});//page =1指向返回是待办事件
         loanModal.present();
         break;  
    }
  }
}
