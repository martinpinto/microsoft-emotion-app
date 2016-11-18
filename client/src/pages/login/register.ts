import { Component } from '@angular/core';
import { ModalController, Platform, ViewController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/AuthService';

@Component({
  selector: 'register',
  templateUrl: "register.html"
})
export class Register {

  email: string;
  password: string; 

  constructor(
    public platform: Platform,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private userService: AuthService
  ) {
    
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public createNewUser() {
    this.userService.createNewUser(this.email, this.password).subscribe((res) => {
    });
  }
}