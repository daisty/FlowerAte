import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReimbursementPage } from '../../reimbursement/reimbursement';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { APP_URL } from '../../../config/config';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-applyreimbursement',
  templateUrl: 'applyreimbursement.html',
})
export class ApplyreimbursementPage {
  paramObj: any = {};
  lenderList: any = [];//获取全体成员
  firstList: any = [];//一级科目
  secondList: any = [];//二级科目
  thirdList: any = [];//三级科目
  areaList: any = [];//获取全部地区
  proGroupList: any = [];
  proNameList: any = [];//获取项目名
  explaisList: any = [];//说明
  Iamges: any = [
    {
      id: 1,
      url: 'assets/imgs/userImage1.png'
    },
    {
      id: 2,
      url: 'assets/imgs/userImage1.png'
    },
    {
      id: 3,
      url: 'assets/imgs/userImage2.png'
    }
  ]
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    private camera: Camera,
    private geolocation: Geolocation,
    private imagePicker: ImagePicker,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('id')) {
      this.http.get(APP_URL + `phoneReimburse/v1/info/reim/${this.navParams.get('id')}/${this.navParams.get('name')}`)
        .then(res => {
          this.paramObj = res.data;
          this.areaCh();
        });
    }
    this.http.get(APP_URL + `applylend/v1/getAllUser`)
      .then(res => {
        this.lenderList = res.data;
      })
    this.http.get(APP_URL + `phoneApplylend/v1/phone/getArea`)
      .then(res => {
        this.areaList = res.data;
      })
    this.http.get(APP_URL + `reimburserecord/v1/listThirdSubject`)
      .then(res => {
        this.thirdList = res.data;
      })
  }
  areaCh() {
    this.http.get(APP_URL + `phoneApplylend/v1/phone/getPGroupList`, { area: this.paramObj.area })
      .then(res => {
        this.proGroupList = res.data;
        if (this.paramObj.area && this.paramObj.projectGroup) {
          this.proFn();
        }
      })
  }
  proFn() {//项目组 获取 项目名
    this.http.get(APP_URL + `phoneApplylend/v1/phone/getPNameList`, { area: this.paramObj.area, projectGroup: this.paramObj.projectGroup })
      .then(res => {
        this.proNameList = res.data;
        if (this.paramObj.thirdSubject && this.paramObj.plainInfo) {
          this.explainFn(this.paramObj.thirdSubject, this.paramObj.plainInfo);
          this.thirdFn(this.paramObj.thirdSubject)
        }
      })
  }
  thirdFn(val: string) {//三级科目
    if (val) {
      this.http.get(APP_URL + `reimburserecord/v1/listPlains`, { thirdSubject: val })
        .then(res => {
          this.explaisList = res.data;
        })
    }
  }
  explainFn(val: string, val1: string) {
    if (val) {
      this.http.get(APP_URL + `phoneApplylend/v1/listSecond`, { thirdSubject: val, plainInfo: val1 })
        .then(res => {
          this.secondList = res.data;
        })
      this.http.get(APP_URL + `phoneApplylend/v1/listFirst`, { thirdSubject: val, plainInfo: val1 })
        .then(res => {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            this.firstList.push(data[i].firstSubjectBO.name);
          }
        })
    }
  }
  addImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择照片形式',
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {
              let b: any = { id: this.Iamges.length, url: '' };
              b.url = 'data:image/png;base64,' + imageData;
              this.Iamges.push(b);
            });
          }
        }, {
          text: '从手机相册选择',
          handler: () => {
            var opt = { maximumImagesCount: 9, outputType: 0 };
            this.imagePicker.getPictures(opt).then((results) => {
              for (var i = 0; i < results.length; i++) {
                let b: any = { id: this.Iamges.length, url: '' };
                b.url = results[i];
                this.Iamges.push(b);
              }
            });
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();
  }
  todo = {
    description: "例如:交代清楚报销事由"
  };
  logForm(form) {
    console.log(form.value)
  }

  delImage(val: number) {
    this.Iamges.splice(val, 1);
  }
  //提交
  submit(): void {
    this.navCtrl.push('ReimbursementPage', { tab: true });
    // this.paramObj.ticketCondition = this.paramObj.ticketCondition ? '是' : '否';
    // if (this.navParams.get('id')) {
    //   this.http.put('reimburserecord/v1/editError', this.paramObj)
    //     .then(res => {
    //       let msg: string;
    //       if (res.code == 0) {
    //         msg = '此次编辑成功!';
    //       } else {
    //         msg = `编辑失败：${res.msg}`;
    //       }
    //       let confirm = this.alertCtrl.create({
    //         title: '消息提示',
    //         message: msg,
    //         buttons: [
    //           {
    //             text: '确认',
    //             handler: () => {
    //               if (!res.msg) this.navCtrl.push('ReimbursementPage', { tab: true });
    //             }
    //           }
    //         ]
    //       });
    //       confirm.present();
    //     })
    // } else {
    //   this.http.post('phoneReimburse/v1/add', this.paramObj)
    //     .then(res => {
    //       let msg: string;
    //       if (res.code == 0) {
    //         msg = '此次申请报销成功!';
    //       } else {
    //         msg = `报销失败：${res.msg}`;
    //       }
    //       let confirm = this.alertCtrl.create({
    //         title: '消息提示',
    //         message: msg,
    //         buttons: [
    //           {
    //             text: '确认',
    //             handler: () => {
    //               if (!res.msg) this.navCtrl.push('ReimbursementPage', { tab: true });
    //             }
    //           }
    //         ]
    //       });
    //       confirm.present();
    //     })
    // }
  }
}
