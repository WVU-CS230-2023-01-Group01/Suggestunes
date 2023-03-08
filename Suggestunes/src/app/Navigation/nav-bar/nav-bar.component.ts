import { Component, Input } from '@angular/core';
import { AccountInfoComponent } from '../../Layouts/account-layout/account-info/account-info.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() username: string;
  myAccCom = new AccountInfoComponent();

  constructor() {
    this.username = this.myAccCom.username;
  }
}
