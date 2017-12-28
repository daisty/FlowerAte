import {Component, ElementRef, Injector, ViewChild} from "@angular/core";
import { IonicPage  } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'city.html',
    styles: []
})
export class cityPage {
    city: string;
    constructor() {
    }
    @ViewChild('areasSelect') areasSelect;
    showAreasSelect() {
        this.areasSelect.open();
    }
    done(data) {
        this.city = data.value;
    }
    closeSelect() {
        alert('你关闭了该功能')
    } 
}
