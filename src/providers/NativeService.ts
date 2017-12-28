import {Injectable} from '@angular/core';
import { Platform,AlertController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from "rxjs";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';//查看当前手机版本号
import { SpeechRecognition } from '@ionic-native/speech-recognition';

declare var LocationPlugin;
declare var AMapNavigation;

@Injectable()
export class NativeService {
    
    constructor(
        private platform: Platform,
        private alertCtrl: AlertController,
        private camera: Camera,
        private inAppBrowser: InAppBrowser,
        private speechRecognition: SpeechRecognition,
        private appVersion: AppVersion) {
    }
    
   /**
   * 是否真机环境
   */
  isMobile(): any {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }
  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
  alert(title: string, subTitle: any = "",): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{text: '确定'}]
    }).present();
  }
  //查看版本号
  checkCode() {
    return this.appVersion.getVersionCode();
  }
  getCamera(){
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return Observable.create( observer => {
      this.camera.getPicture().then( imgData => {
        if(options.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        }else {
          observer.next(imgData);
        }
      })
    }).catch(err => {
        if (err == 20) {
          this.alert('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        this.alert('获取照片失败');
      });
  }
  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }
  //开始语音转换
  startListening() {
    let option = {
      language: '"cmn-Hans-CN'
    }
    return this.speechRecognition.startListening(option)
  }
  //获取语音权限
  getPermissions() {
    this.speechRecognition.hasPermission()
      .then((hasPermission:boolean) => {
        if(!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      })
  }
}