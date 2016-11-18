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
import { PhotoPage } from '../pages/photo/photo';

// Services
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/AuthService'; 
import { EmotionService } from '../providers/EmotionService'; 


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    EmailLoginForm,
    Register,
    PhotoPage
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
    Register,
    PhotoPage
  ],
  providers: [AuthService, EmotionService, Storage]
})
export class AppModule {}
