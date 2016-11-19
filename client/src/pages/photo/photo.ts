import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController } from 'ionic-angular';
import { EmotionService } from '../../providers/EmotionService';

import { EmotionPage } from '../emotion/emotion';

@Component({
  selector: 'photo',
  templateUrl: 'photo.html',
  providers: [EmotionService]
})
export class PhotoPage {
  public base64Image: string;

  constructor(public navCtrl: NavController, private emotionService: EmotionService) {

  }
  
  /*
   * Sample from:
   * http://blog.ionic.io/10-minutes-with-ionic-2-using-the-camera-with-ionic-native/
   */ 
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  uploadPicture() {
    this.emotionService.post(this.base64Image).subscribe((res) => {
      console.log(res);
      this.navCtrl.push(EmotionPage, { 
          emotion: res
      });
    });
  }

}
