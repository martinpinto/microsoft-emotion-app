import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { EmailLoginForm } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ContactPage;
  tab2Root: any = EmailLoginForm;

  constructor() {

  }
}
