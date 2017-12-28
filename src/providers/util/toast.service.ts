import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import  {APP_URL,USER_URL,CONTACT,HOME} from '../../config/config';
import { Storage } from '@ionic/storage';
import { GlobalData } from '../GlobalData';

@Injectable()
export class ToastService {
  private rs:any = {msg:'?'};
  constructor(
      public http:Http,
      public storage: Storage,
      public globalData :GlobalData,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      public toastCtrl: ToastController
) { 
  
}
   get(url:any,option?:any) {
      let headers = this.setHeader();
       return this.http.get(url + this.toQueryString(option),new RequestOptions({headers: headers}))
        .toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(error => this.handleError(error));
   }
   public getUser(url: string) {
      let headers = new Headers({
         'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"});
        return this.http.post( USER_URL + url, new RequestOptions({headers: headers}))
       .toPromise()
       .then(res => {
        let result = res.json();
        if(result){
            if (result.code == 0) {
              return result;
            }else{
                this.rs.msg = result.msg;
                this.rs.code = result.code;
              return this.rs;
            }
        }
        })
       .catch(error => this.handleError(error));
   }
   public post(url: string, paramObj?: any) {
     let headers = this.setHeader();
     return this.http.post(url,  this.toBodyString(paramObj), new RequestOptions({headers: headers}))
       .toPromise()
       .then(res => this.handleSuccess(res.json()))
       .catch(error => this.handleError(error));
   }
   public put(url: string, paramObj?: any) {
     let headers = this.setHeader();
     return this.http.put(url,this.toBodyString(paramObj), new RequestOptions({headers: headers}))
       .toPromise()
       .then(res => this.handleSuccess(res.json()))
       .catch(error => this.handleError(error));
   }
   private setHeader() {
     let token = this.globalData.token;
     let headers = new Headers({
         'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8",
         'userToken':token});
      return headers;
   }
   //处理成功之后数据
   private handleSuccess(result) {
     if(result){
        if (result.code == 0) {
          return result;
        }else{
            this.rs.msg = result.msg;
            this.rs.code = result.code;
          return this.rs;
        }
     }
   }
   //抓取错误
   private handleError(error: Response | any) {
     let o = JSON.parse(error._body);
     let obj :any = {};
     obj.msg = o.msg;
     obj.code = o.code;
     return obj;
   }

   //将put请求参数解析
   private toBodyString(obj) {
     let ret = [];
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {//数组
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         ret = ret.concat(queryValues);
       } else { //字符串
         ret.push(this.toQueryPair(key, values));
       }
     }
     return ret.join('&');
   }

   //解析get请求参数
   private toQueryString(obj) {
     let ret = [];
     if(JSON.stringify(obj) == "{}" || !obj)return ''
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {//数组
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         ret = ret.concat(queryValues);
       } else { //字符串
         ret.push(this.toQueryPair(key, values));
       }
    }
    return '?' + ret.join('&');
   }
   //处理参数的格式 key = value
   private toQueryPair(key, value) {
     if (typeof value == 'undefined') {
       return key;
     }
     return key + '=' + encodeURIComponent(value === null ? '' : String(value));
   } 
   loadding() {
     let loading = this.loadingCtrl.create({
      content:'正在加载数据...'
    });
    return loading;
   }
   alert(title: string, subTitle: any = "",): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{text: '确定'}]
    }).present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
  get token(): string {
    return this.globalData.token;
  }
}