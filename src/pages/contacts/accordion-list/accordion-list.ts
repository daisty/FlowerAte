import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ActionSheetController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { CONTACT } from '../../../config/config';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-accordion-list',
  templateUrl: 'accordion-list.html',
})
export class AccordionListPage {
  id: string;
  depPerson: any = [];//获取部门下的人数
  department: string = '1';
  depList: any = [];//获取部门下的人数
  itemList:any = [];
  phoneMobile: any = [];
  items = [
    {
      name: '总经办',
      people:'2人',
      username: '小红文',
      sex:'MEN',
      position:'总经办',
      department:'研发部',
      postbtn:'总经理',
      imageUrl: 'http://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479915553/angra-dos-reis-brazil-WTG2017.jpg?itok=damBsB9G',
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http:ToastService,
    public actionSheetCtrl: ActionSheetController,
    private callNumber: CallNumber) {

      //组织结构人数
      this.http.get(CONTACT + `internalcontacts/v1/mobile/people`)
        .then(res => {
          this.depPerson = res.data;
        });

      //组织结构人数
      this.http.get(CONTACT + `internalcontacts/v1/mobile/info`,{dep:this.department})
      .then(res => {
        this.depList = res.data;
      });
        
   }

  showCall(){
     this.http.get(CONTACT + `internalcontacts/v1/mobile/tel`)
      .then(res => {
        this.phoneMobile = res.data;

        let actionSheet = this.actionSheetCtrl.create({
          title: '选择需拨打的号码',
          buttons: [
            {
              text: this.phoneMobile[0].phone,
              handler: () => {
                console.log(0);
              }
            },
            {
              text: this.phoneMobile[0].phoneNumberA,
              handler: () => {
                console.log(1);
              }
            },
            {
              text: this.phoneMobile[0].phoneNumberB,
              handler: () => {
                console.log(2);
              }
            },
            {
              text: this.phoneMobile[0].phoneNumberC,
              handler: () => {
                console.log(3);
              }
            },
            {
              text: this.phoneMobile[0].phoneNumberD,
              handler: () => {
                console.log(4);
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        })
        actionSheet.present();
      });


  }

}
