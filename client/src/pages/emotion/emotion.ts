import { Component } from '@angular/core';
import { ModalController, Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/AuthService';

@Component({
  selector: 'emotion',
  templateUrl: "emotion.html"
})
export class EmotionPage {
  private emotion;    

  constructor(
    public platform: Platform,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private userService: AuthService,
		private navParams: NavParams,
  ) {
  	this.emotion = this.navParams.get('emotion');  
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}