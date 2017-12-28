import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ASKFORLEAVE } from '../../../config/config';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-add-askforleave',
  templateUrl: 'add-askforleave.html',
})

export class AddAskforleavePage {
  id: string;
  uuid: any;//获取uuid
  howLong: string;//获取时长
  userInfo: any = {};//获取用户信息
  areaList: any = [];//获取地区
  postList: any = [];//获取岗位
  departmentList: any = [];//获取部门
  sendtoSb: any = [];//获取主送人
  sendtoSone: any = [];//获取抄送人
  paramObj: any = { vacateType: "" };
  data: any = { area: false, department: false, post: false };//判断是否填写方式手填or选择
  @ViewChild('select') select;
  @ViewChild('select2') select2;
  a1: boolean = false;
  a2: boolean = false;
  items: any = [
    {
      value: '年假',
      msg: 'ANNUAL'
    },
    {
      value: '事假',
      msg: 'MATTER'
    },
    {
      value: '病假',
      msg: 'SICK'
    },
    {
      value: '调休',
      msg: 'ADJUST'
    },
    {
      value: '婚假',
      msg: 'MARRY'
    },
    {
      value: '产假',
      msg: 'MATERNITY'
    },
    {
      value: '陪产假',
      msg: 'PATERNITY'
    },
    {
      value: '产检假',
      msg: 'CHECK'
    },
    {
      value: '丧假',
      msg: 'FUNERAL'
    },
    {
      value: '其他',
      msg: 'OTHER'
    }
  ]
  Iamges: any = [];
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  constructor(public navCtrl: NavController, private transfer: FileTransfer, private imagePicker: ImagePicker, private camera: Camera, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public http: ToastService, public photoViewer: PhotoViewer, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    //获取用户信息
    this.http.get(ASKFORLEAVE + 'vacate/v1/user')
      .then(res => {
        this.userInfo = res.data;
        //获取主送人
        this.http.get(ASKFORLEAVE + `vacate/v1/mains/${encodeURI(this.userInfo.username)}`)
          .then(res => {
            this.sendtoSb = res.data;
          })
        //获取抄送人
        this.http.get(ASKFORLEAVE + `vacate/v1/carbons/${encodeURI(this.userInfo.username)}`)
          .then(res => {
            this.sendtoSone = res.data;
          })
      })
    //获取地区
    this.http.get(ASKFORLEAVE + 'vacate/v1/areas')
      .then(res => {
        this.areaList = res.data;
      })
    //获取uuid
    this.http.get(ASKFORLEAVE + 'vacate/v1/uuid')
      .then(res => {
        this.uuid = res.data;
      })
    //获取部门
    this.http.get(ASKFORLEAVE + 'vacate/v1/departs')
      .then(res => {
        this.departmentList = res.data;
      })
    //获取岗位
    this.http.get(ASKFORLEAVE + 'vacate/v1/positions')
      .then(res => {
        this.postList = res.data;
      })
  }

  //实时获取请假时长
  change() {
    if (this.paramObj.startDate && this.paramObj.startTime && this.paramObj.endDate && this.paramObj.endTime) {
      this.http.get(ASKFORLEAVE + 'vacate/v1/get/time', this.paramObj)
        .then(res => {
          this.howLong = res.data;
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
              // b.url = 'data:image/png;base64,' + imageData;
              b.url = imageData;
              this.Iamges.push(b);
            });
          }
        }, {
          text: '从手机相册选择',
          handler: () => {
            var opt = { maximumImagesCount: 9, outputType: 0, quality: 50 };
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
  showBig(url: string) {
    this.photoViewer.show(url, '我的图片展示', { share: false });
  }
  //删除附件
  delImage(val: number): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除附件',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            this.Iamges.splice(val, 1);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    actionSheet.present();
  }
  //删除主送人
  delSb(val: number): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除该主送人',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            this.paramObj.mains.splice(val, 1);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }

        }
      ]
    })
    actionSheet.present();
  }
  //删除抄送人
  delSone(val: number): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除该抄送人',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            this.paramObj.carbons.splice(val, 1);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }

        }
      ]
    })
    actionSheet.present();
  }
  sendtoWho() {
    this.select.open();
  }
  sendtoCarbons() {
    this.select2.open();
  }

  submit(): void {
    this.paramObj.employeeNumber = this.userInfo.employeeNumber;
    this.paramObj.name = this.userInfo.username;
    this.paramObj.uuid = this.uuid;

    if (this.Iamges.length == 0) {
      this.a1 = true;
    } else {
      const fileTransfer: FileTransferObject = this.transfer.create();
      for (let i = 0; i < this.Iamges.length; i++) {
        let options = {
          fileKey: 'files',
          fileName: 'name' + i + '.jpg',
          headers: { 'userToken': localStorage.getItem('token') }
        }
        fileTransfer.upload(this.Iamges[i].url, ASKFORLEAVE + `vacate/v1/uploadFile/${this.uuid}`, options)
          .then((data) => {
            if (i == this.Iamges.length - 1) {
              this.a1 = true;
            }
          }, (err) => {
          })
      }
    }

    this.http.post(ASKFORLEAVE + 'vacate/v1/save', this.paramObj)
      .then(res => {
        let loading = this.loadingCtrl.create({
          content: '正在上传...',
        });
        loading.present();

        let msg: string;
        if (res.code == 0) {
          this.a2 = true;
          if (this.a1) {
            msg = '此次编辑成功!';
          } else {
            msg = '图片上传失败!';
          }
        } else {
          msg = `编辑失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.code) {
                  if (this.a1) {
                    loading.dismiss();
                    this.navCtrl.push('AskforleavePage', { tab: true });
                  }
                }
              }
            }
          ]
        });
        if (this.a1 && this.a2) {
          confirm.present();
        }
      })
  }
}
