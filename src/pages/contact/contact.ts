import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from '../../providers/NativeService';

declare var LocationPlugin;
declare var AMap;

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  constructor(private geolocation: Geolocation,public navCtrl: NavController,public navHttp: NativeService) {

  }
  ionViewDidLoad() {
    // this.load();
    this.test();
  }
  test(){
    LocationPlugin.getLocation(data => {
      this.navHttp.alert(data.longitude + ',' + data.address);
      console.log(data)
      this.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        center:[data.longitude,data.latitude],
        zoom: 18, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });
    new AMap.Marker({
        map: this.map,
        position: [data.longitude,data.latitude],
            icon: new AMap.Icon({            
                size: new AMap.Size(40, 50),  //图标大小
                image: "assets/imgs/map.png",
                imageOffset: new AMap.Pixel(0, -60)
            })        
        });
    }, msg => {
      alert(JSON.stringify(msg))
    });
  }
  load(){
    this.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        center:[113.23,23.16],
        zoom: 16, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });
    new AMap.Marker({
        map: this.map,
        position: [113.23,23.16],
            icon: new AMap.Icon({            
                size: new AMap.Size(40, 50),  //图标大小
                // image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                image: "assets/imgs/map1.png",
                // imageOffset: new AMap.Pixel(0, -60)
                imageOffset: new AMap.Pixel(0, 0)
            })        
        });
  }
  map1() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // "纬度："+ resp.coords.latitude+ ',' + '经度' + resp.coords.longitude;
      this.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        center:[resp.coords.longitude, resp.coords.latitude],
        zoom: 16, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
        })
      });
      new AMap.Marker({
        map: this.map,
        position: [resp.coords.longitude, resp.coords.latitude],
            icon: new AMap.Icon({            
                size: new AMap.Size(40, 50),  //图标大小
                image: "assets/imgs/map1.png",
                imageOffset: new AMap.Pixel(0, 0)
            })        
        });
    })
  }
  login() {
    this.navHttp.openUrlByBrowser('http://www.baidu.com');
  }
}