import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Contact} from "../models/contact.model";
import {Group} from "../models/group.model";
import { Pinyin } from '../plugins/pinyin';

@Injectable()
export class ContactsProvider {
    searchQuery: string = ''; 
    items: any;
    searchItems:any;
    constructor(public http: Http) {
       
    }
    /**
     * Get contacts data
     * @returns {Promise<TResult|T>}
    //  */

    /**
     * Grouping contacts
     * @param array
     * @returns {any}
     */
    grouping(array): Group[] {
        
        let pin = new Pinyin;
        
        let groupContacts: Group[] = [];
        const letterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

        if (array.length <= 0) return [];

        // Create a parent container
        groupContacts = letterStr.split('')
            .map((str) => {
                return {
                    groupName: str,
                    contacts: []
                }
            });

        // Push into the correct group
        groupContacts.forEach((item,index) => {
            
            for (var i = 0;i<array.length;i++) {

                if(array[i].customerName){
                    array[i].username = array[i].customerName;
                }
                if(array[i].username){
                    let aa;
                   if(pin.toPinyin(array[i].username.split('')[0]) == 'undefined'){
                        aa = array[i].username
                   }else{
                        aa = pin.toPinyin(array[i].username);
                   }
                
                    if (aa.split('')[0].toUpperCase() === item.groupName) {
                        item.contacts.push(array[i]);
                    } else if (letterStr.indexOf(aa.split('')[0].toUpperCase()) === -1) {
                    
                        if(index == 26){
                            groupContacts[groupContacts.length - 1].contacts.push(array[i]);
                        }
                        
                    }
                }else{
                    if(index == 26){
                        groupContacts[groupContacts.length - 1].contacts.push(array[i]);
                    }
                }
                
                item.keyLetter = item.contacts.length == 0? false: true;
                
                
            }

        });

        return groupContacts;

    }

}
