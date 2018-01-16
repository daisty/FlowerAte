import { Component,ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content ,ModalController, ViewController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { APP_URL } from '../../config/config';
import { NativeService } from '../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  private show :boolean = false;
  private seleFont :string = '全部';
  private statusList :any= [{test:'123123'},{test:'fa'},{test:'123123'},{test:'adf'},{test:'afd'},{test:'afd'},{test:'3'},{test:'424'}];
  private tab :boolean;
  private statusL:string = 'ALL';//请求参数
  private pageNum: number = 1;//分页
  private items :any = [
    {
      value:'全部',
      msg:'ALL'
    },
    {
      value:'待审核',
      msg:'WAITAUDIT'
    },
    {
      value:'待付款',
      msg:'WAITPAY'
    },
    {
      value:'已借款',
      msg:'HASLEND'
    },
    {
      value:'待还款',
      msg:'WAITRETURN'
    },
    {
      value:'已还款',
      msg:'HASRETURN'
    },
    {
      value:'待解冻',
      msg:'WAITTHAW'
    }
  ];
  @ViewChild(Content) content: Content;
  @ViewChild('abc') list: ElementRef;
  private hideBtn :boolean = true;//控制 上拉加载 true 为显示

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http:ToastService,
     public navHttp: NativeService,
     public modalCtrl: ModalController,
     private viewCtrl: ViewController,
     ) {
    this.tab = navParams.get('tab');
  }
  ionViewDidLoad() {
  }
  selectFilter() {
  }
  toPage() {
    // this.hideBtn = !this.hideBtn;
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.push('TabsPage',{page:this.navParams.get('page')});
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    this.fn().then((res:any) => {
      if(res.code == 0){
        let num = 0;
        for(let i = 0,len=10;i < len;i++){
          num++;
          let obj = {test:num};
          this.statusList.push(obj);
        }
      }else {
        this.content.scrollTo(0,this.list.nativeElement.offsetHeight - this.content.scrollHeight + 53,0)
      }
      infiniteScroll.complete();
    })
      //infiniteScroll.enable(value) value = false 停止下拉操作
  }
  set() {
    // this.app.getRootNav().push('TabsPage',{tab:true})
    // this.navCtrl.setRoot('TabsPage');
    // let modal = this.modalCtrl.create('TabsPage');
    // modal.present();
    this.viewCtrl.dismiss(null,null,{animate:false}); 
    this.tab = !this.tab;
  }
  fn() {
    return new Promise((resolve,reject)=> {
      setTimeout(()=> {
        if(this.tab){
          resolve({test:'err',code:1})
        }else {
          resolve({test:'success',code:0})
        }
      },1500)
    })
  }
}
