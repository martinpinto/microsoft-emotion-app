import { Component } from '@angular/core';

import { AuthService } from '../../providers/AuthService';
import { UserIonic } from '../../models/User';
import { Storage } from '@ionic/storage';

import { ModalController, NavController, ToastController } from 'ionic-angular';
import { RegisterPage } from './register';

@Component({
    selector: "login",
    templateUrl: 'login.html',
    providers: [AuthService]
})
export class EmailLoginForm {
    
    email: string;
    password: string;    

    constructor(
        private userService: AuthService, 
        private storage: Storage,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        ) {}
    
    public openModal() {
        let modal = this.modalCtrl.create(RegisterPage);
        modal.present();
    }

    public login() {
        let user = new UserIonic();
        user.email = this.email;
        user.password = this.password;
        this.userService.login(user).subscribe((res) => {
            console.log('login()');            
            console.log(res);
            /*
            this.navCtrl.push(Control, { 
                message: 'Log in successful!',
                thermostats: res
            });
            */
        });
    }

     showToast(message: string) {
        let toast = this.toastCtrl.create({
          message,
          duration: 2000,
          position: 'top'
        });
    
        toast.present(toast);
    }

}