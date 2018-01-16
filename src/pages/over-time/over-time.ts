import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController,NavParams,Content } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { ASKFORLEAVE, USER_URL } from '../../config/config';
import { NativeService } from '../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-over-time',
  templateUrl: 'over-time.html',
})
export class OverTimePage {
  titleArr:Array<{title:string,type:string}>;//筛选标题
  titleIndex:number = 0;//记录下标
  imageUrl:string = USER_URL + 'v1/titlePic/';
  statusList:Array<{}>;
  pageNum:number = 1;//记录当前页码
  private hideBtn: boolean = true;//控制上拉加载true为显示
  currenPage:string;
  private tab :boolean;
  bool:boolean;//控制 加载数据瞬间 不能有上拉操作 
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public http:ToastService,
    public navHttp: NativeService,
    public modalCtrl: ModalController,
    public navParams: NavParams,) {
      this.tab = navParams.get('tab');
  }

  ionViewDidLoad() {
    this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/identity')
      .then((res)=> {// 负责人：CHARGE 
        if(res.code == 0) {
          if(res.data.overWorkIndentity == 'MANAGE'){
            this.titleArr = [{title:'待我审核',type:'WAIT'},{title:'我录入的加班',type:'SEE'}, {title:'我的加班',type:'ADUIT'}];
          }else if(res.data.overWorkIndentity == 'CHARGE') {
            this.titleArr = [{title:'我录入的加班',type:'SEE'}, {title:'我的加班',type:'ADUIT'}];
          }else if(res.data.overWorkIndentity == 'NOMAL') {
            this.titleArr = [{title:'我的加班',type:'ADUIT'}];
          }
           this.change(this.titleArr[0].type,0,2);
           this.titleIndex = 0;
        }
      })    
  }
  change (type:string,index?:number,a?) {
      this.currenPage = type;
      if(a!==2)this.content.scrollTo(0, 0, 0);//控制页面切换顶部开始
      this.hideBtn = false;
      this.pageNum = 1;
      this.titleIndex = index;
      this.bool = false;
    if(type == 'ADUIT'){
      this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/list',{overWorker:localStorage.getItem('userName')})
      .then((res)=> {//我的加班
        if(res.code == 0)this.statusList = res.data;
        this.bool = true;
        this.hideBtn = true;
      })
    }else if(type == 'SEE'){
      this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/entry/list',{entryer:localStorage.getItem('userName')})
      .then((res)=> {//我录入的加班
        if(res.code == 0)this.statusList = res.data;
        this.bool = true;
        this.hideBtn = true;
      })
    }else if(type == 'WAIT'){
      this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/audit/list',{entryer:localStorage.getItem('userName')})
      .then((res)=> {//待我审核
       if(res.code == 0)this.statusList = res.data;
       this.bool = true;
       this.hideBtn = true;
      })
    }
  }
  toPage(id:string){
    this.navCtrl.push('OvertimeDetailPage',{id:id})
  }
  submit(){
    this.navCtrl.push('OvertimeApplyPage');
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.bool){
      setTimeout(() => {
        this.pageNum++;
      let type = this.currenPage;
      if(type == 'ADUIT' && this.bool){
        this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/list',{overWorker:localStorage.getItem('userName'),page:this.pageNum})
        .then((res)=> {//我的加班
          this.hideBtn = false;
          infiniteScroll.complete();
          if(JSON.stringify(res.data) !== "{}" && res.data){
            this.dataPush(res.data,this.statusList);
          }else{
            this.hideBtn = false;
          }
        })
      }else if(type == 'SEE' && this.bool){
        this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/entry/list',{entryer:localStorage.getItem('userName'),page:this.pageNum})
        .then((res)=> {//我录入的加班
           infiniteScroll.complete();
            if(JSON.stringify(res.data) !== "{}" && res.data){
              this.dataPush(res.data,this.statusList);
            }else{
              this.hideBtn = false;
            }
        })
      }else if(type == 'WAIT' && this.bool){
        this.http.get(ASKFORLEAVE + 'phoneoverwork/v1/my/audit/list',{entryer:localStorage.getItem('userName'),page:this.pageNum})
        .then((res)=> {//待我审核
           infiniteScroll.complete();
            if(JSON.stringify(res.data) !== "{}" && res.data){
              this.dataPush(res.data,this.statusList);
            }else{
              this.hideBtn = false;
            }
        })
      }
    },500);
    }
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.push('TabsPage',{page:this.navParams.get('page')});
  }
  dataPush(arr1,arr2){
    for(let i = 0,len = arr1.length;i < len;i++){
      arr2.push(arr1[i]);
    }
  }
} 
