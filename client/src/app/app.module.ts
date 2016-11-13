// Modules
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

// Components
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { EmailLoginForm } from '../pages/login/login';
import { Register } from '../pages/login/register';

// Services
import { Storage } from '@ionic/storage';
import { UserService } from '../providers/UserService'; 


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    EmailLoginForm,
    Register
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    EmailLoginForm,
    Register
  ],
  providers: [UserService, Storage]
})
export class AppModule {}
