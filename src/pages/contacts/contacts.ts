import { Component, ViewChildren, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, ModalController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
// import { ContactField, ContactFindOptions, ContactFieldType, Device } from 'ionic-native';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';   
import { ToastService } from '../../providers/util/toast.service';
import { ContactsProvider } from '../../providers/contacts';
import {Contact} from "../../models/contact.model";
import {Group} from "../../models/group.model";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs';
import { CONTACT, USER_URL  } from '../../config/config';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contactodd: string = "internal";
  index: string = 'A';
  showModal: boolean = false;
  // showSearch: boolean = false;
  timeout: any;
  allContacts: any[];
  allInner: any[];
  allBusiness: any[];
  // innerContacts: Array<any> = [];
  // exterContacts: Array<any> = [];
  // businessContacts: Array<any> = [];
  // comContacts: Array<any> = [];
  innerContacts: any;
  exterContacts: any;
  // businessContacts: Array<any> = [];
  comContacts: any;
  itemss = [];
  indexes: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
  offsetTops: Array<number> = [];
  isAndroid: boolean = false;
  groupName: string;
  searchQuery: string = '';
  searchInput: string;  
  searchControl: FormControl;
  searching: any = false;
  items: any;
  searchItems:any;
  come:any;
  phoneMobile:any;
  private innerPage: number = 1//内部分页
  private outerPage: number = 1//外部分页
  private businessPage: number = 1//商务分页
  private tab: boolean;
  private hideBtn: boolean = true;//控制上拉加载true为显示
  imgsUrl:string=  USER_URL + '/v1/titlePic/';

  @ViewChildren('IonItemGroup') ionItemGroup;
  @ViewChild(Content) content: Content;

  constructor(
    platform: Platform, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: ToastService,
    public ref: ChangeDetectorRef,
    public contactsSever: ContactsProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public callNumber: CallNumber) {

    this.searchControl = new FormControl();
    this.initializeItems();
  }

  
  ionViewDidLoad() {
    this.inter();
    // let load = this.http.loadding();
    // load.present();
    // let t1 = this.http.get(CONTACT + 'internalcontacts/v1/mobile/list');
    // let t2 = this.http.get(CONTACT + 'externalcontacts/v1/mobile/list');
    // let t3 = this.http.get(CONTACT + 'commercecontacts/v1/mobile/list');
    // Promise.all([t1,t2,t3])
    //   .then((arr) => {
    //     if(arr.length){
    //       this.innerContacts = arr[0].data;
    //       this.exterContacts = arr[1].data;
    //       this.comContacts = arr[2].data;
    //       load.dismiss();
    //     }
    //   })
    this.http.get(CONTACT + 'internalcontacts/v1/mobile/list')
    .then( res => {
      this.innerContacts = this.contactsSever.grouping(res.data);
    });
    
  }

  inter(contactodd?){

    if(contactodd == 'internal'){
      this.http.get(CONTACT + 'internalcontacts/v1/mobile/list', { page: this.businessPage})
      .then( res => {
        this.innerContacts = this.contactsSever.grouping(res.data);
      });
    }else if(contactodd == 'external'){
      this.http.get(CONTACT + 'externalcontacts/v1/mobile/list', {page: this.businessPage})
      .then( res => {
        this.exterContacts = this.contactsSever.grouping(res.data); 
      });
    }else if(contactodd == 'business'){
      this.http.get(CONTACT + 'commercecontacts/v1/mobile/list', { page: this.businessPage})
      .then( res => {
        this.comContacts = this.contactsSever.grouping(res.data);    
      });
    }
  }
  showSearch(){
    this.navCtrl.push('ContactSearchPage');
  }

  showOgranize(){
    this.navCtrl.push('AccordionListPage');
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

  initializeItems() {
    this.innerContacts = this.allInner;
    this.exterContacts = this.allContacts; 
    this.comContacts = this.allBusiness;
  }

  getItems(ev: any) {

    let val = ev.target.value;
    
    if(this.come == '内部通讯录'){
      this.innerContacts = this.allInner;   
      if (val && val.trim() != '') {  
        this.innerContacts = this.innerContacts.filter((item) => {  
          for(var i = 0; i < item.contacts.length; i++){
            if(item.contacts[i].username){
              return (item.contacts[i].username.toLowerCase().indexOf(val.toLowerCase()) > -1);
            }else{
              return false;
            }
          }
        })
      }
    }else if(this.come == '外部通讯录') {
      this.exterContacts = this.allContacts;   
        if (val && val.trim() != '') {  
          this.exterContacts = this.exterContacts.filter((item) => {  
            for(var i = 0; i < item.contacts.length; i++){
              if(item.contacts[i].username){
                return (item.contacts[i].username.toLowerCase().indexOf(val.toLowerCase()) > -1);
              }else{
                return false;
              }
            }
          })
        }
      }else if(this.come == '商务通讯录'){
        this.comContacts = this.allBusiness;   
        if (val && val.trim() != '') {  
          this.comContacts = this.comContacts.filter((item) => {  
            for(var i = 0; i < item.contacts.length; i++){
              if(item.contacts[i].username){
                return (item.contacts[i].username.toLowerCase().indexOf(val.toLowerCase()) > -1);
              }else{
                return false;
              }
            }
          })
        }
      }
   
  } 
  

  openInternalPage(id:string) {
    let accountModal = this.modalCtrl.create('InternalAddress',{id: id});
    accountModal.present();
  }

  openOuternalPage(id:string) {
    let accountModal = this.modalCtrl.create('ExternalAddress', { id: id });
    accountModal.present();
  }

  openBusinessPage(id:string) {
    let accountModal = this.modalCtrl.create('BusinessAddress', { id: id });
    accountModal.present();
  }

  ionViewDidEnter() {
    this.getOffsetTops();
  }

  getOffsetTops() {
      this.offsetTops = this.ionItemGroup._results.map(ele => {
          return ele.nativeElement.offsetTop
      })
      console.log(this.offsetTops);
  }

  selectIndex(index: number) {
      this.index = this.indexes[index];
      const offsetTop = this.offsetTops[index];
      this.content.scrollTo(0, offsetTop, 300);
      this.createModal();
      console.log(this.indexes[index],this.offsetTops[index]);
  }


  onScroll() {

    const threshold = 42;

    if (this.content.scrollTop < threshold) {
        this.index = this.indexes[0];
        return;
    }
    
    for (let i = this.offsetTops.length; i > 0; i--) {
        if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
            this.index = this.indexes[i];
            this.ref.detectChanges();
            return;
        }
    }
  }

  // create modal
  createModal() {
      clearTimeout(this.timeout);
      this.showModal = true;
      this.timeout = setTimeout(() => {
          this.showModal = false;
          this.ref.detectChanges();
      }, 800)
  }

  contsctChange() {
    this.hideBtn = true;
    this.content.scrollTo(0, 0, 0);//控制页面切换顶部开始
  }

  //上拉加载
  doInfinite(infiniteScroll, contactodd) {
    // setTimeout(() => {
    //   if (contactodd == "internal") {
    //     this.innerPage++;
    //     this.http.get(CONTACT + 'internalcontacts/v1/mobile/list',{ page: this.innerPage})
    //       .then(res => {
    //         let data = res.data;
            
    //         if (res.code == 0) {
    //           if (res.data) {
    //             for (let i = 0, len = data.length, val; i < len; i++) {
    //               val = data[i];
    //               this.innerContacts.push(val);
    //             }
    //           } else {
    //             this.hideBtn = false;
    //           }
    //         }
    //         infiniteScroll.complete();
    //       });
    //   } else if(contactodd == "external"){
    //     this.outerPage++;
    //     this.http.get(CONTACT + 'externalcontacts/v1/mobile/list',{ page: this.outerPage})
    //       .then(res => {
    //         let data = res.data;
    //         if (res.code == 0) {
    //           if (res.data) {
    //             for (let i = 0, len = data.length, val; i < len; i++) {
    //               val = data[i];
    //               this.exterContacts.push(val);
    //             }
    //           } else {
    //             this.hideBtn = false;
    //           }
    //         }
    //         infiniteScroll.complete();
    //       });
    //   } else if(contactodd == "business"){
    //     this.businessPage++;
    //     this.http.get(CONTACT + 'commercecontacts/v1/mobile/list',{ page: this.businessPage})
    //       .then(res => {
    //         let data = res.data;
    //         if (res.code == 0) {
    //           if (res.data) {
    //             for (let i = 0, len = data.length, val; i < len; i++) {
    //               val = data[i];
    //               this.comContacts.push(val);
    //             }
    //           } else {
    //             this.hideBtn = false;
    //           }
    //         }
    //         infiniteScroll.complete();
    //       });
    //   }
    // }, 500);
    infiniteScroll.complete();
  }
}
