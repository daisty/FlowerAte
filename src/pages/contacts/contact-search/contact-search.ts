import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { CONTACT } from '../../../config/config';
import { ContactsProvider } from '../../../providers/contacts';
@IonicPage()
@Component({
  selector: 'page-contact-search',
  templateUrl: 'contact-search.html',
})
export class ContactSearchPage {
  allContacts: any[];
  allInner: any[];
  allBusiness: any[];
  innerContacts: Array<any> = [];
  exterContacts: Array<any> = [];
  businessContacts: Array<any> = [];
  comContacts: Array<any> = [];
  come: any;
  havePerson: boolean = false;
  // indexes: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: ToastService,
              public contactsSever: ContactsProvider,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.http.get(CONTACT + 'internalcontacts/v1/mobile/list')
    .then( res => {
      this.allInner = this.contactsSever.grouping(res.data);
      this.innerContacts = this.contactsSever.grouping(res.data);
    });
    this.http.get(CONTACT + 'externalcontacts/v1/mobile/list')
    .then( res => {
      this.allContacts = this.contactsSever.grouping(res.data);
      this.exterContacts = this.contactsSever.grouping(res.data); 
    })
    this.http.get(CONTACT + 'commercecontacts/v1/mobile/list')
    .then( res => {
      this.allBusiness = this.contactsSever.grouping(res.data);
      this.comContacts = this.contactsSever.grouping(res.data);    
    })
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
      console.log(this.come);
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

}
