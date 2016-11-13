import { Component } from '@angular/core';
import { ModalController, Platform, ViewController, NavController } from 'ionic-angular';
import { UserService } from '../../providers/UserService';

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
    private userService: UserService
  ) {
    
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public createNewUser() {
    this.userService.createNewUser(this.email, this.password).subscribe((res) => {
      /*
      this.navCtrl.push(Control, { 
        message: 'User created successful!', 
        thermostats: res
      });
      */
    });
  }
}