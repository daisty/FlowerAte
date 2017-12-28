import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { TASK } from '../../../config/config';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Title } from '@angular/platform-browser/src/browser/title';

@IonicPage()
@Component({
  selector: 'page-task-completion',
  templateUrl: 'task-completion.html',
})

export class TaskCompletionPage {
  @Input() inputArray: [{}];
  myForm: FormGroup;
  id: string;
  uuid: any;//获取uuid
  howLong: string;//获取时长
  userInfo: any = {};//获取用户信息
  areaList: any = [];//获取地区
  postList: any = [];//获取岗位
  departmentList: any = [];//获取部门
  sendtoSb: any = [];//获取主送人
  sendtoSone: any = [];//获取抄送人
  paramObj: any = {};
  data: any = { area: false, department: false, post: false };//判断是否填写方式手填or选择
  // startTime: string = '2017-12-8 10:10:10';
  // endTime: string = '2017-12-12 10:10:10';
  @ViewChild('select') select;
  @ViewChild('select2') select2;
  a1: boolean = false;
  a2: boolean = false;

  Iamges: any = [];
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  // get items(): FormArray {

  // }
  // get qu(): FormArray {
  //   return this.myForm.get('question') as FormArray;
  // }
  items: any = [
    {
      title: '问题'
    }
  ];

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private imagePicker: ImagePicker,
    private camera: Camera,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public http: ToastService,
    public photoViewer: PhotoViewer,
    public loadingCtrl: LoadingController,
    public fb: FormBuilder) {
    // -->Init: a new form
    this.myForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
  }

  ngOnInit(): void {
    let newForm = this.fb.group({
      // appearsOnce: ['InitialValue', [Validators.required, Validators.maxLength(25)]],
      formArray: this.fb.array([])
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    // this.inputArray.forEach(item => {
    //   let newGroup = this.fb.group({
    //     itemPropertyOne: ['InitialValue', [Validators.required]],
    //     // itemPropertyTwo: ['InitialValue', [Validators.minLength(5), Validators.maxLength(20)]]
    //   });
    //   arrayControl.push(newGroup);
    // });

    this.myForm = newForm;
  }

  // 添加问题
  addItem(): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    let newGroup = this.fb.group({

    });
    arrayControl.push(newGroup);
    // this.items.push(this.fb.group({
    //   // title: ['问题'+ (this.items.length + 1)],
    //   // reason: [0]
    // }))
    // // this.items.push({ title: '问题' + (this.items.length + 1) });
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
    this.paramObj.question = this.paramObj.question?'true':'false';
    this.http.put(TASK + 'tasknode/v1/phone/write', this.paramObj)
      .then(res => {
        if (res.msg) {
          this.http.presentToast(res.msg);
        };
        // let loading = this.loadingCtrl.create({
        //   content: '正在上传...',
        // });
        // loading.present();

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
        this.paramObj.question.forEach((v, i) => {
          this.items.push(this.fb.group(v))
        });
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.code) {
                  if (this.a1) {
                    // loading.dismiss();
                    this.navCtrl.push('TaskAssignmentPage', { tab: true });
                  }
                }
              }
            }
          ]
        });
        if (this.a1 && this.a2) {
          confirm.present();
        }
        if (res.code == 0) this.navCtrl.push('TaskAssignmentPage', { tab: true });
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
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
        fileTransfer.upload(this.Iamges[i].url, `tasknode/v1/uploadFile/${this.uuid}`, options)
          .then((data) => {
            if (i == this.Iamges.length - 1) {
              this.a1 = true;
            }
          }, (err) => {

          }).catch(res => {
            this.http.presentToast(res.msg);
          });
      }
    }
  }
}